from django.urls import path
from . import views
from .views import UserRegistrationView


urlpatterns = [
     path('home/', views.HomeView.as_view(), name ='home'),
     path('logout/', views.LogoutView.as_view(), name ='logout'),
     path('register/', UserRegistrationView.as_view(), name='register')
]