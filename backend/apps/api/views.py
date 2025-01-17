import datetime

from django.forms import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

from .models import Task
from .serializers import TaskSerializer

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