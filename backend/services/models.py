from config.storages import MediaStorage
from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=255, unique=True, verbose_name="Название категории"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Service(models.Model):
    storage = MediaStorage()
    category = models.ForeignKey(
        Category,
        related_name="services",
        on_delete=models.CASCADE,
        verbose_name="Категория",
    )
    name = models.CharField(max_length=255, verbose_name="Название услуги")
    description = models.TextField(verbose_name="Описание услуги")
    detailed_description = models.TextField(
        blank=True, null=True, verbose_name="Детальное описание"
    )
    image = models.ImageField(
        storage=storage,
        upload_to="services",
        null=True,
        blank=True,
        verbose_name="Изображение услуги",
    )
    video_url = models.URLField(blank=True, null=True, verbose_name="Ссылка на видео")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
