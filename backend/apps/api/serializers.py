import datetime

from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.password_validation import validate_password

from rest_framework import viewsets, permissions, serializers
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Task, User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 
            'titulo', 
            'descripcion', 
            'estado', 
            'fecha_vencimiento', 
            'creado_en', 
            'actualizado_en'
        ]
        read_only_fields = ['id', 'creado_en', 'actualizado_en']

    def validate_titulo(self, value):
        # Validación de longitud del título
        if len(value) < 3:
            raise serializers.ValidationError("El título debe tener al menos 3 caracteres")
        if len(value) > 200:
            raise serializers.ValidationError("El título no puede exceder los 200 caracteres")
        return value

    def validate_estado(self, value):
        # Validación de estados permitidos
        estados_validos = ['pending', 'in_progress', 'completed']
        if value not in estados_validos:
            raise serializers.ValidationError(
                f"Estado inválido. Debe ser uno de: {', '.join(estados_validos)}"
            )
        return value

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Solo tareas del usuario actual
        return Task.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Validaciones adicionales en la creación
        try:
            # Validación de fecha de vencimiento
            fecha_vencimiento = serializer.validated_data.get('fecha_vencimiento')
            if fecha_vencimiento:
                if fecha_vencimiento < datetime.date.today():
                    raise ValidationError({
                        "fecha_vencimiento": "La fecha de vencimiento no puede ser en el pasado"
                    })

            # Validación de descripción
            descripcion = serializer.validated_data.get('descripcion', '')
            if descripcion and len(descripcion) > 1000:
                raise ValidationError({
                    "descripcion": "La descripción no puede exceder los 1000 caracteres"
                })

            # Crear tarea para el usuario actual
            serializer.save(usuario=self.request.user)

        except DjangoValidationError as e:
            # Convertir excepciones de Django a excepciones de DRF
            raise ValidationError(e.message_dict)

    def perform_update(self, serializer):
        # Validaciones en la actualización
        try:
            # Obtener la instancia actual
            instance = self.get_object()

            # Verificar propiedad de la tarea
            if instance.usuario != self.request.user:
                raise PermissionDenied("No tienes permiso para modificar esta tarea")

            # Validaciones adicionales
            fecha_vencimiento = serializer.validated_data.get('fecha_vencimiento', instance.fecha_vencimiento)
            
            if fecha_vencimiento and fecha_vencimiento < datetime.date.today():
                raise ValidationError({
                    "fecha_vencimiento": "La fecha de vencimiento no puede ser en el pasado"
                })

            # Guardar la actualización
            serializer.save()

        except DjangoValidationError as e:
            # Convertir excepciones de Django a excepciones de DRF
            raise ValidationError(e.message_dict)

    def perform_destroy(self, instance):
        # Validaciones antes de eliminar
        if instance.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para eliminar esta tarea")

        # Verificar si la tarea puede ser eliminada
        if instance.estado == 'in_progress':
            raise ValidationError({
                "error": "No se puede eliminar una tarea en progreso"
            })

        # Eliminar la tarea
        instance.delete()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data