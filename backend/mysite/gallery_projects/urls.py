from django.urls import path
from rest_framework import routers
from .views import ProjectViewSet
from django.urls import include

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename="project")

urlpatterns = [
    path('', include(router.urls))
]
