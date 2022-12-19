from rest_framework import viewsets, permissions, generics
from order.serializers import OrderSerializer
from order.models import Order
from order.utils import recalc_tickets, check_date
from order.task import send_email

from django.contrib.auth.models import User

from rest_framework_simplejwt.authentication import JWTAuthentication


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        if request.data["is_paid"] and request.data["is_paid"]["status"] == "COMPLETED":
            request.data.setdefault("paid_at", request.data["is_paid"]["create_time"])
            request.data["is_paid"] = True
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            # recalc_tickets(response.data["concert"], response.data["qty"])
            email = User.objects.get(id=response.data["user"]).email
            send_email.delay(email, response.data["purchase_type"])
        return response

    def update(self, request, *args, **kwargs):
        if request.data["is_paid"] and request.data["is_paid"]["status"] == "COMPLETED":
            request.data.setdefault("paid_at", request.data["is_paid"]["create_time"])
            request.data["is_paid"] = True
        return super().update(request, *args, **kwargs)


class OrderUMyView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        return user.order_set.all()

    def get(self, request, *args, **kwargs):
        check_date(self.request.user)
        return super().get(request, *args, **kwargs)
