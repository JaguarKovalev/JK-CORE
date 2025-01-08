from django.contrib import admin

from .models import Client, Project


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):

    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = ["id", "name", "client"]
    search_fields = ["name", "client__name"]
