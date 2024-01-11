from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

# Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'is_staff')
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            is_staff=validated_data.get('is_staff', False)  # Domyślnie nie jest administratorem
        )
        return user
