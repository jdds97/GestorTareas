from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Task, User

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Task.
    Maneja la validación y serialización de tareas.
    """
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
        """
        Valida la longitud del título de la tarea.
        Debe tener entre 3 y 200 caracteres.
        """
        if not 3 <= len(value) <= 200:
            raise serializers.ValidationError(
                "El título debe tener entre 3 y 200 caracteres"
            )
        return value

    def validate_estado(self, value):
        """
        Valida que el estado de la tarea sea uno de los permitidos.
        """
        estados_validos = ['pending', 'in_progress', 'completed']
        if value not in estados_validos:
            raise serializers.ValidationError(
                f"Estado inválido. Debe ser uno de: {', '.join(estados_validos)}"
            )
        return value

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo User.
    Maneja la creación y validación de usuarios.
    """
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},  # Añadido write_only para seguridad
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        """
        Crea un nuevo usuario con los datos validados.
        Asegura el correcto hasheo de la contraseña.
        """
        user = User.objects.create_user(**validated_data)  # Uso de create_user en lugar de create
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializador personalizado para tokens JWT.
    Añade información adicional del usuario al token.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'username': self.user.username,
            'email': self.user.email
        })
        return data