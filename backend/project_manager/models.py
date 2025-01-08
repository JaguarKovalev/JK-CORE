from django.db import models
from employees.models import Employee


class Client(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название заказчика")
    email = models.EmailField(verbose_name="Email заказчика")
    phone = models.CharField(max_length=20, verbose_name="Телефон заказчика")
    address = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Адрес"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Заказчик"
        verbose_name_plural = "Заказчики"


class Project(models.Model):
    STATUS_CHOICES = [
        ("active", "Активный"),
        ("completed", "Завершённый"),
        ("on_hold", "Приостановленный"),
    ]

    name = models.CharField(max_length=255, verbose_name="Название проекта")
    description = models.TextField(verbose_name="Описание проекта")
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="projects",
        verbose_name="Заказчик",
    )
    executors = models.ManyToManyField(
        Employee, related_name="projects", verbose_name="Исполнители"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active",
        verbose_name="Статус проекта",
    )
    start_date = models.DateField(verbose_name="Дата начала")
    end_date = models.DateField(blank=True, null=True, verbose_name="Дата окончания")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
