from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Маршруты сотрудников
    path("employees/", include("employees.urls")),
    # Маршруты услуг
    path("services/", include("services.urls")),
    # Маршруты проектов
    path("projects/", include("project_manager.urls")),
    # Маршруты портфолио
    path("portfolio/", include("portfolio.urls")),
    # JWT токены
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
