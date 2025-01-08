import os

from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
SECRET_KEY = "django-insecure-78sam12$e&7v(w=ejdbo9+xx9doi402tjcq*ml7!z0$kqa1ccd"
DEBUG = config("DEBUG", default=False, cast=bool)
ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_spectacular",
    "corsheaders",
    "storages",  # Для работы с S3
    # My Apps
    "employees",
    "services",
    "project_manager",
    "portfolio",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "jk_core_db",
        "USER": "jk_core_admin",
        "PASSWORD": "79nUnVQx?VL2_u",
        "HOST": "cloud.jkproduction.pro",
        "PORT": "5482",
    }
}

AUTH_USER_MODEL = "employees.Employee"

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# Статические файлы хранятся локально
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")  # Путь для хранения статики

# Медиафайлы хранятся в S3
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_ACCESS_KEY_ID = "jaguarkovalev"
AWS_SECRET_ACCESS_KEY = "_YN-zm8HxWKX8$j"
AWS_STORAGE_BUCKET_NAME = "jk-core-media"
AWS_S3_ENDPOINT_URL = "https://cloud.jkproduction.pro:9010"
AWS_QUERYSTRING_AUTH = False
MEDIA_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/"


# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_ALL_ORIGINS = True

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "BLACKLIST_AFTER_ROTATION": True,
}

INSTALLED_APPS += ["rest_framework_simplejwt.token_blacklist"]

SPECTACULAR_SETTINGS = {
    "TITLE": "API Documentation",
    "DESCRIPTION": "Документация для API проекта JK-Core",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{config('REDIS_HOST', default='localhost')}:{config('REDIS_PORT', default=6379)}/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
        "KEY_PREFIX": "jk_project",
    }
}

CSRF_TRUSTED_ORIGINS = [
    "https://cloud.jkproduction.pro",  # Ваш домен с HTTPS
    "http://cloud.jkproduction.pro",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://core.jkproduction.pro",
    "http://core.jkproduction.pro",
    "http://core.jkproduction.pro:3000",
    "http://core.jkproduction.pro:8000",
    "https://core.jkproduction.pro:3000",
    "https://core.jkproduction.pro:8000",
]
