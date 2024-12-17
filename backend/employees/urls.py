from django.urls import path

from .views import (
    ChangePasswordView,
    EmployeeDetailView,
    EmployeeListView,
    RegisterEmployeeView,
    UserProfileView,
)

app_name = "employees"

urlpatterns = [
    path("", EmployeeListView.as_view(), name="employee-list"),
    path("<int:pk>/", EmployeeDetailView.as_view(), name="employee-detail"),
    path("register/", RegisterEmployeeView.as_view(), name="register-employee"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
]
