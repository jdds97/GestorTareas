from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing tasks.
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(usuario=self.request.user)

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status = request.query_params.get('status', None)
        tasks = self.get_queryset()
        
        if status:
            tasks = tasks.filter(status=status)
        
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)
