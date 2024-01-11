'''from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User, Group

class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        Group.objects.create(name='user')
        Group.objects.create(name='admin')

    def test_user_registration(self):
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
            "role": "user"
        }
        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())
        user = User.objects.get(username='testuser')
        self.assertTrue(user.groups.filter(name='user').exists())
        '''