# Generated by Django 5.1.4 on 2024-12-17 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="service",
            name="detailed_description",
            field=models.TextField(
                blank=True, null=True, verbose_name="Детальное описание"
            ),
        ),
        migrations.AddField(
            model_name="service",
            name="video_url",
            field=models.URLField(
                blank=True, null=True, verbose_name="Ссылка на видео"
            ),
        ),
    ]
