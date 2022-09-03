from django.urls import path, include
from rest_framework.routers import DefaultRouter
from concert_type.views import ConcertTypeView


router = DefaultRouter()
router.register(r'', ConcertTypeView, basename="concert-type")


urlpatterns = [
    path('', include(router.urls)),
]