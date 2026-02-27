from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Added predict_yield to the import list below
from .views import UserProfileViewSet, ListingViewSet, RequirementViewSet, register_user, predict_yield 
from rest_framework.authtoken.views import obtain_auth_token 

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'requirements', RequirementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', obtain_auth_token), 
    path('register/', register_user), 
    path('predict-yield/', predict_yield), # <--- Added the new AI endpoint here
]