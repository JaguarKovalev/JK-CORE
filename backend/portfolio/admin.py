from django.contrib import admin

from .models import Portfolio, PortfolioCategory


@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "type", "category", "client", "created_at"]
    list_filter = ["type", "category", "client"]
    search_fields = ["name", "description"]
    filter_horizontal = ["executors"]  # Удобный выбор для ManyToMany поля
    readonly_fields = ["created_at"]
