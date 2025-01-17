from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Crear el router para manejar las rutas automáticas de la API
router = DefaultRouter()
# Registrar el viewset de tareas con la ruta 'tasks/'
router.register('tasks', TaskViewSet, basename='task')

# Nombre de la aplicación para namespace de URLs
app_name = 'api'

# Patrones de URL de la API
urlpatterns = [
    # Incluir todas las rutas generadas por el router
    path('', include(router.urls)),
]