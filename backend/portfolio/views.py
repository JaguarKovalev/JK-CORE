from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .models import Portfolio, PortfolioCategory
from .serializers import PortfolioCategorySerializer, PortfolioSerializer


class PortfolioListView(ListAPIView):
    queryset = (
        Portfolio.objects.select_related("category", "client")
        .prefetch_related("executors")
        .all()
        .order_by("-created_at")
    )
    serializer_class = PortfolioSerializer
    permission_classes = [AllowAny]


class PortfolioDetailView(RetrieveAPIView):
    queryset = (
        Portfolio.objects.select_related("category", "client")
        .prefetch_related("executors")
        .all()
    )
    serializer_class = PortfolioSerializer
    permission_classes = [AllowAny]


class PortfolioCategoryListView(ListAPIView):
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategorySerializer
    permission_classes = [AllowAny]
