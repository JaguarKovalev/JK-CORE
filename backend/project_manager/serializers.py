from employees.serializers import EmployeeSerializer
from rest_framework import serializers

from .models import Client, Project


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "email", "phone", "address"]


class ProjectSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    executors = EmployeeSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "client",
            "executors",
            "status",
            "start_date",
            "end_date",
        ]
