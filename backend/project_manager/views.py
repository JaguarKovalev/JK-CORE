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
from services.models import Service

from .models import Client, Employee, Project
from .serializers import ClientSerializer, EmployeeSerializer, ProjectSerializer


class StatisticsView(APIView):
    """
    Возвращает статистику по проектам, услугам и сотрудникам.
    """

    # Подсчёт статистики сотрудников
    employees = Employee.objects.all()
    free_employees = busy_employees = overloaded_employees = 0

    for employee in employees:
        active_projects_count = Project.objects.filter(
            executors=employee, status="active"
        ).count()
        if active_projects_count == 0:
            free_employees += 1
        elif active_projects_count == 1:
            busy_employees += 1
        else:
            overloaded_employees += 1

    def get(self, request):
        data = {
            "total_projects": Project.objects.count(),
            "completed_projects": Project.objects.filter(status="completed").count(),
            "active_projects": Project.objects.filter(status="active").count(),
            "total_services": Service.objects.count(),
            "total_employees": Employee.objects.count(),
            "admins": Employee.objects.filter(role="admin").count(),
            "users": Employee.objects.filter(role="user").count(),
            "free_employees": self.free_employees,
            "busy_employees": self.busy_employees,
            "overloaded_employees": self.overloaded_employees,
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
