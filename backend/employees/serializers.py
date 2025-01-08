from employees.models import Employee
from project_manager.models import Project
from rest_framework import serializers


class EmployeeSerializer(serializers.ModelSerializer):
    workload_status = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "workload_status",
        ]

    def get_workload_status(self, obj):
        # Получаем количество активных проектов сотрудника
        active_projects = Project.objects.filter(executors=obj, status="active").count()
        if active_projects == 0:
            return "free"
        elif active_projects == 1:
            return "busy"
        else:
            return "overloaded"
