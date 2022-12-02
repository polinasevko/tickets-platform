from django.urls import path, include
from rest_framework.routers import DefaultRouter
from order.views import OrderView, OrderUMyView


router = DefaultRouter()
router.register(r"", OrderView, basename="order")


urlpatterns = [
    path("my/", OrderUMyView.as_view(), name='my-orders'),
    path("", include(router.urls)),
]
