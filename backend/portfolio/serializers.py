from employees.serializers import EmployeeSerializer
from project_manager.serializers import ClientSerializer
from rest_framework import serializers

from .models import Portfolio, PortfolioCategory


class PortfolioCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioCategory
        fields = ["id", "name"]


class PortfolioSerializer(serializers.ModelSerializer):
    category = PortfolioCategorySerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    executors = EmployeeSerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "name",
            "description",
            "type",
            "category",
            "client",
            "executors",
            "image",
            "video_url",
            "created_at",
        ]
