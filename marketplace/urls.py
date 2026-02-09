from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, ListingViewSet, RequirementViewSet, register_user
from rest_framework.authtoken.views import obtain_auth_token # <--- Import this

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'requirements', RequirementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', obtain_auth_token), # <--- Add this line
    path('register/', register_user), # Added registration endpoint for new users
]