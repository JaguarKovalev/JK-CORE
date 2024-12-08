from django.urls import path

from .views import (
    ChangePasswordView,
    EmployeeDetailView,
    EmployeeListView,
    RegisterEmployeeView,
    UserProfileView,
)

urlpatterns = [
    path("employees/", EmployeeListView.as_view(), name="employee-list"),
    path("employees/<int:pk>/", EmployeeDetailView.as_view(), name="employee-detail"),
    path(
        "employees/register/", RegisterEmployeeView.as_view(), name="register-employee"
    ),
    path(
        "employees/change-password/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),
    path("employees/profile/", UserProfileView.as_view(), name="user-profile"),
]
