from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("employees.urls")),
]

# JWT
urlpatterns += [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
