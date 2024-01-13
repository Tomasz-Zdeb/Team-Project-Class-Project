from django.http import JsonResponse
from rest_framework import viewsets
from .models import MenuItem
from .serializers import MenuItemSerializer

# Create your views here.
def api_test(request):
    return JsonResponse({"message": "Hello from Django!"})


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer