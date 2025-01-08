from django.urls import path

from .views import (
    ClientListView,
    ProjectCreateView,
    ProjectDeleteView,
    ProjectDetailView,
    ProjectListView,
    ProjectUpdateView,
    StatisticsView,
)

urlpatterns = [
    path("", ProjectListView.as_view(), name="project-list"),
    path("<int:pk>/", ProjectDetailView.as_view(), name="project-detail"),
    path("create/", ProjectCreateView.as_view(), name="project-create"),
    path("<int:pk>/update/", ProjectUpdateView.as_view(), name="project-update"),
    path("<int:pk>/delete/", ProjectDeleteView.as_view(), name="project-delete"),
    path("clients/", ClientListView.as_view(), name="client-list"),
    path("statistics/", StatisticsView.as_view(), name="project-statistics"),
]
