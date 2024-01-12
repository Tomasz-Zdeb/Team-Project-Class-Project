from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import MenuItemViewSet

router = SimpleRouter()
router.register(r'menuitems', MenuItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    ]
