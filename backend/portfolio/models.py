from config.storages import MediaStorage
from django.db import models
from employees.models import Employee
from project_manager.models import Client  # Модель заказчика из проектов


class PortfolioCategory(models.Model):
    name = models.CharField(
        max_length=255, unique=True, verbose_name="Название категории"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория портфолио"
        verbose_name_plural = "Категории портфолио"


class Portfolio(models.Model):

    TYPE_CHOICES = [
        ("photo", "Фото"),
        ("video", "Видео"),
    ]

    name = models.CharField(max_length=255, verbose_name="Название работы")
    description = models.TextField(verbose_name="Описание работы")
    type = models.CharField(
        max_length=10, choices=TYPE_CHOICES, verbose_name="Тип работы"
    )
    category = models.ForeignKey(
        PortfolioCategory,
        on_delete=models.CASCADE,
        related_name="works",
        verbose_name="Категория",
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="portfolio_works",
        verbose_name="Заказчик",
    )
    executors = models.ManyToManyField(
        Employee, related_name="portfolio_works", verbose_name="Исполнители"
    )
    image = models.ImageField(
        storage=MediaStorage(),
        upload_to="portfolio/images/",
        null=True,
        blank=True,
        verbose_name="Фото работы",
    )
    video_url = models.URLField(null=True, blank=True, verbose_name="Ссылка на видео")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Работа портфолио"
        verbose_name_plural = "Работы портфолио"
