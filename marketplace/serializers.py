from rest_framework import serializers
from .models import UserProfile, Listing, Requirement
from django.contrib.auth.models import User

# Serializer for the main User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Serializer for the Extended Profile
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

# Serializer for Farmer Listings
class ListingSerializer(serializers.ModelSerializer):
    farmer_name = serializers.ReadOnlyField(source='farmer.user.username')

    class Meta:
        model = Listing
        fields = '__all__'

# Serializer for Startup Requirements
class RequirementSerializer(serializers.ModelSerializer):
    startup_name = serializers.ReadOnlyField(source='startup.company_name')

    class Meta:
        model = Requirement
        fields = '__all__'