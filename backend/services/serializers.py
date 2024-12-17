from rest_framework import serializers

from .models import Category, Service


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ServiceSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = ["id", "name", "description", "image", "category"]


class ServiceDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "description",
            "detailed_description",
            "image",
            "video_url",
            "category",
        ]
