from django.urls import path

from .views import CategoryListView, ServiceDetailView, ServiceListView

app_name = "services"

urlpatterns = [
    path("", ServiceListView.as_view(), name="service-list"),
    path("<int:pk>/", ServiceDetailView.as_view(), name="service-detail"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
]
