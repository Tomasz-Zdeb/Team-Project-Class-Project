from django.urls import path
from . import views
from .views import UserRegistrationView, UserListView


urlpatterns = [
     path('home/', views.HomeView.as_view(), name ='home'),
     path('logout/', views.LogoutView.as_view(), name ='logout'),
     path('register/', UserRegistrationView.as_view(), name='register'),
     path('users/', views.UserListView.as_view(), name='user-list'),
     path('users/<int:pk>/', views.UserListView.as_view(), name='user-detail'),

]