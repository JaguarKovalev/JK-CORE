from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = (
            Project.objects.select_related("client").prefetch_related("executors").all()
        )
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            project = (
                Project.objects.select_related("client")
                .prefetch_related("executors")
                .get(pk=pk)
            )
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)
