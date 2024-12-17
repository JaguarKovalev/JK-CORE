from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(ListAPIView):
    queryset = (
        Project.objects.select_related("client").prefetch_related("executors").all()
    )
    serializer_class = ProjectSerializer


class ProjectDetailView(RetrieveAPIView):
    queryset = (
        Project.objects.select_related("client").prefetch_related("executors").all()
    )
    serializer_class = ProjectSerializer
