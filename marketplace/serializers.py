from rest_framework import serializers
from .models import UserProfile, Listing, Requirement

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'

class ListingSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(source='farmer.user.username', read_only=True)
    
    class Meta:
        model = Listing
        fields = '__all__'
        # THIS IS THE FIX: Frontend doesn't need to send 'farmer', 'created_at', etc.
        read_only_fields = ['farmer', 'created_at'] 

class RequirementSerializer(serializers.ModelSerializer):
    startup_name = serializers.CharField(source='startup.company_name', read_only=True)
    
    class Meta:
        model = Requirement
        fields = '__all__'
        # THIS IS THE FIX: Frontend doesn't need to send 'startup'
        read_only_fields = ['startup', 'created_at']