from rest_framework import serializers

from employees.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "username", "first_name", "last_name", "email", "role"]