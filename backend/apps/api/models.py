from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models

class User(AbstractUser):
    """
    Modelo personalizado de Usuario que extiende AbstractUser.
    No añade campos adicionales pero permite extensibilidad futura.
    """
    class Meta:
        ordering = ['date_joined']

class Task(models.Model):
    """
    Modelo para gestionar tareas de usuarios.
    Incluye información básica como título, descripción, estado y fechas.
    """
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completada')
    ]
    
    titulo = models.CharField(
        max_length=200,
        help_text="Título de la tarea"
    )
    descripcion = models.TextField(
        blank=True,
        help_text="Descripción detallada de la tarea"
    )
    estado = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        help_text="Estado actual de la tarea"
    )
    fecha_vencimiento = models.DateField(
        null=True,
        blank=True,
        help_text="Fecha límite para completar la tarea"
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tareas',
        help_text="Usuario propietario de la tarea"
    )

    class Meta:
        ordering = ['-creado_en']  # Ordenar por fecha de creación descendente
        verbose_name = "Tarea"
        verbose_name_plural = "Tareas"

    def __str__(self):
        return self.titulo
