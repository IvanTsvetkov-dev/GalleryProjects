from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic.base import RedirectView


schema_view = get_schema_view(
    openapi.Info(
        title="Gallery projects API",
        default_version='v1',
        description="API для WWW системы «Галерея проектов» (подсистема администрирования)",
        contact=openapi.Contact(email="ivan.tsvetkov.0462@mail.ru"),
    ),
    public=True,
    # permission_classes=(permissions.AllowAny,),  # Кому разрешён доступ к документации
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger'),
    path('api/v1/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/v1/', include("gallery_projects.urls")),
    path('', RedirectView.as_view(url='/api/v1/', permanent=False)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)