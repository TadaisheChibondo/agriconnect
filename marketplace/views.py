from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from .models import UserProfile, Listing, Requirement
from .serializers import UserProfileSerializer, ListingSerializer, RequirementSerializer

# ---------------------------------------------------------
# 1. REGISTRATION VIEW (Sign Up)
# ---------------------------------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        # Create base User
        if User.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(
            username=data['username'],
            email=data.get('email', ''),
            password=data['password']
        )

        # Create UserProfile (Farmer or Startup)
        UserProfile.objects.create(
            user=user,
            user_type=data['user_type'], # 'FARMER' or 'STARTUP'
            phone=data.get('phone', ''),
            location=data.get('location', ''),
            company_name=data.get('company_name', ''),
            processing_capacity=data.get('processing_capacity', '')
        )
        
        return Response({'message': 'User registered successfully'}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# ---------------------------------------------------------
# 2. VIEWSETS (API Logic)
# ---------------------------------------------------------

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Auto-assign logged-in user as Farmer
        try:
            serializer.save(farmer=self.request.user.userprofile)
        except UserProfile.DoesNotExist:
            raise Exception("User profile not found. Please contact admin.")

    # AI MATCHING: Help Farmer find Buyers
    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        listing = self.get_object()
        potential_buyers = Requirement.objects.filter(
            crop_needed__iexact=listing.crop_name, is_active=True
        )

        matches = []
        for buyer in potential_buyers:
            score = 0
            reasons = []

            # Logic
            if buyer.max_price_per_kg >= listing.price_per_kg:
                score += 50
                reasons.append("Great Price")
            else:
                score -= 10
                reasons.append("Price Mismatch")

            try:
                if float(listing.quantity_kg) >= float(buyer.quantity_needed_kg):
                    score += 30
                    reasons.append("Full Supply")
                elif float(listing.quantity_kg) >= (float(buyer.quantity_needed_kg) * 0.1):
                    score += 10
                    reasons.append("Partial Supply")
            except: pass

            if score > 0:
                matches.append({
                    "buyer_name": buyer.startup.company_name or "Startup",
                    "price_offer": buyer.max_price_per_kg,
                    "quantity_needed": buyer.quantity_needed_kg,
                    "match_score": score,
                    "match_reasons": reasons,
                    # CONTACT INFO
                    "contact_phone": buyer.startup.phone,
                    "contact_email": buyer.startup.user.email,
                    "location": buyer.startup.location
                })

        matches.sort(key=lambda x: x['match_score'], reverse=True)
        return Response(matches)

class RequirementViewSet(viewsets.ModelViewSet):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Auto-assign logged-in user as Startup
        try:
            serializer.save(startup=self.request.user.userprofile)
        except UserProfile.DoesNotExist:
            raise Exception("User profile not found.")

    # AI MATCHING: Help Startup find Farmers
    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        requirement = self.get_object()
        potential_listings = Listing.objects.filter(
            crop_name__iexact=requirement.crop_needed
        )

        matches = []
        for listing in potential_listings:
            score = 0
            reasons = []

            if listing.price_per_kg <= requirement.max_price_per_kg:
                score += 40
                reasons.append("Within Budget")
            else:
                score -= 10
                reasons.append("Over Budget")

            try:
                if float(listing.quantity_kg) >= float(requirement.quantity_needed_kg):
                    score += 50
                    reasons.append("Full Capacity")
            except: pass
            
            score += 10 # Freshness bonus

            if score > 0:
                matches.append({
                    "farmer_name": listing.farmer.user.username,
                    "crop": listing.crop_name,
                    "quantity": listing.quantity_kg,
                    "price": listing.price_per_kg,
                    "image": listing.image.url if listing.image else None,
                    "match_score": score,
                    "match_reasons": reasons,
                    # CONTACT INFO
                    "contact_phone": listing.farmer.phone,
                    "contact_email": listing.farmer.user.email,
                    "location": listing.farmer.location
                })

        matches.sort(key=lambda x: x['match_score'], reverse=True)
        return Response(matches)