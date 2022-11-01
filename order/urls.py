from django.urls import path, include
from rest_framework.routers import DefaultRouter
from order.views import OrderView


router = DefaultRouter()
router.register(r"", OrderView, basename="order")


urlpatterns = [
    path("", include(router.urls)),
]
