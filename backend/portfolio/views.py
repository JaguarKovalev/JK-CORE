from django.core.paginator import Paginator
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Portfolio, PortfolioCategory
from .serializers import PortfolioCategorySerializer, PortfolioSerializer


class PortfolioPagination(PageNumberPagination):
    page_size = 6  # Количество элементов на странице
    page_size_query_param = "page_size"
    max_page_size = 20


class PortfolioListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category_id = request.GET.get(
            "category"
        )  # Получаем параметр категории из запроса

        # Фильтруем работы по категории, если параметр передан
        works = Portfolio.objects.select_related("category", "client").prefetch_related(
            "executors"
        )
        if category_id:
            works = works.filter(category_id=category_id)

        # Получаем параметры пагинации
        page = request.GET.get("page", 1)
        page_size = 6  # Количество элементов на странице

        # Пагинация
        paginator = Paginator(works, page_size)
        current_page = paginator.page(page)

        serializer = PortfolioSerializer(current_page.object_list, many=True)

        return Response(
            {
                "count": paginator.count,
                "total_pages": paginator.num_pages,
                "current_page": int(page),
                "results": serializer.data,
            }
        )


class PortfolioDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            work = (
                Portfolio.objects.select_related("category", "client")
                .prefetch_related("executors")
                .get(pk=pk)
            )
            serializer = PortfolioSerializer(work)
            return Response(serializer.data)
        except Portfolio.DoesNotExist:
            return Response({"error": "Portfolio work not found"}, status=404)


class PortfolioCategoryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = PortfolioCategory.objects.all()
        serializer = PortfolioCategorySerializer(categories, many=True)
        return Response(serializer.data)
