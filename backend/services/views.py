from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Service
from .serializers import CategorySerializer, ServiceDetailSerializer, ServiceSerializer


class ServiceListPagination(PageNumberPagination):

    # Количество элементов на странице
    page_size = 100
    page_size_query_param = (
        "page_size"  # Позволяет изменять размер страницы через параметр
    )
    max_page_size = 100  # Максимальный размер страницы


@method_decorator(cache_page(60), name="dispatch")
class ServiceListView(ListAPIView):
    queryset = Service.objects.select_related("category").all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category"]
    search_fields = ["name", "description"]
    pagination_class = ServiceListPagination


@method_decorator(cache_page(60), name="dispatch")
class ServiceDetailView(RetrieveAPIView):
    queryset = Service.objects.select_related("category").all()
    serializer_class = ServiceSerializer


@method_decorator(cache_page(60), name="dispatch")
class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
