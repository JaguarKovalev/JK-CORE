from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer


class ServiceListView(ListAPIView):
    queryset = Service.objects.select_related("category").all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category"]
    search_fields = ["name", "description"]


class ServiceDetailView(RetrieveAPIView):
    queryset = Service.objects.select_related("category").all()
    serializer_class = ServiceSerializer


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
