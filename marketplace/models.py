from django.db import models
from django.contrib.auth.models import User

# 1. User Profile: Extends the default Django User
class UserProfile(models.Model):
    USER_TYPE_CHOICES = (
        ('FARMER', 'Farmer'),
        ('STARTUP', 'Beneficiation Startup'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=255) # E.g., "Bulawayo, Zimbabwe"
    
    # NEW: Captures Farmer's crops/livestock OR Startup's target materials
    specialty = models.CharField(max_length=255, blank=True, null=True) 
    
    # Specific to Startups
    company_name = models.CharField(max_length=100, blank=True, null=True)
    processing_capacity = models.CharField(max_length=100, blank=True, null=True) # e.g. "5 tons/week"

    def __str__(self):
        return f"{self.user.username} - {self.user_type}"

# 2. Farmer's Listing: The "Supply"
class Listing(models.Model):
    farmer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='listings')
    crop_name = models.CharField(max_length=100) # e.g. "Maize", "Tomatoes"
    variety = models.CharField(max_length=100, blank=True) # e.g. "SC727"
    
    quantity_kg = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    
    # AI Field: We will use this date to predict supply peaks
    harvest_date = models.DateField()
    
    # AI Field: Image for Computer Vision grading later
    image = models.ImageField(upload_to='crop_images/', blank=True, null=True)
    
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop_name} ({self.quantity_kg}kg) by {self.farmer.user.username}"

# 3. Startup's Requirement: The "Demand"
class Requirement(models.Model):
    startup = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='requirements')
    crop_needed = models.CharField(max_length=100)
    quantity_needed_kg = models.DecimalField(max_digits=10, decimal_places=2)
    max_price_per_kg = models.DecimalField(max_digits=10, decimal_places=2)
    
    required_by_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Need {self.crop_needed} by {self.startup.company_name}"