from django.db.models import Count
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Client, Employee, Project
from .serializers import ClientSerializer, ProjectSerializer


class ProjectStatisticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Статистика по статусам проектов
        projects_by_status = Project.objects.values("status").annotate(
            total=Count("id")
        )

        # Нагрузка сотрудников
        employee_load = Employee.objects.annotate(
            project_count=Count("project")
        ).values("id", "username", "project_count")

        data = {
            "projects_by_status": projects_by_status,
            "employee_load": list(employee_load),
        }

        return Response(data)


class ClientListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)


class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = (
            Project.objects.select_related("client").prefetch_related("executors").all()
        )
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            project = (
                Project.objects.select_related("client")
                .prefetch_related("executors")
                .get(pk=pk)
            )
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)


# Создание проекта (доступно только администратору)
class ProjectCreateView(CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminUser]


# Обновление проекта (доступно только администратору)
class ProjectUpdateView(UpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminUser]


# Удаление проекта (доступно только администратору)
class ProjectDeleteView(DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminUser]
