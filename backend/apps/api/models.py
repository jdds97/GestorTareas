from django.contrib.auth.models import AbstractUser
from django.db import models

from django.conf import settings

class User(AbstractUser):
    class Meta:
        ordering = ['date_joined']

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completada')
    ]
    
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    fecha_vencimiento = models.DateField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tareas'
    )

    class Meta:
        ordering = ['-creado_en']

    def __str__(self):
        return self.titulo

