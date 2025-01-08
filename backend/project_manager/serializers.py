from employees.serializers import EmployeeSerializer
from rest_framework import serializers

from .models import Client, Project


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "email", "phone", "address"]


class ProjectSerializer(serializers.ModelSerializer):
    executors = EmployeeSerializer(many=True, read_only=True)
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "status",
            "client",
            "start_date",
            "end_date",
            "executors",
        ]

    def validate_client(self, value):
        if not value:
            raise serializers.ValidationError("Client is required.")
        return value
