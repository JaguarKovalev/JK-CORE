from django.urls import path

from .views import PortfolioCategoryListView, PortfolioDetailView, PortfolioListView

urlpatterns = [
    path("", PortfolioListView.as_view(), name="portfolio-list"),
    path("<int:pk>/", PortfolioDetailView.as_view(), name="portfolio-detail"),
    path(
        "categories/",
        PortfolioCategoryListView.as_view(),
        name="portfolio-category-list",
    ),
]
