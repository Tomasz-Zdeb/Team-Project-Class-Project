from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

# Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'password', 'is_staff')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            is_staff=validated_data.get('is_staff', False)
        )
        return user

    def update(self, instance, validated_data):
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.save()
        return instance


