from django.contrib import admin
from .models import UserProfile, Listing, Requirement

admin.site.register(UserProfile)
admin.site.register(Listing)
admin.site.register(Requirement)