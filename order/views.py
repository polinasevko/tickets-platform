from rest_framework import viewsets, permissions
from order.serializers import OrderSerializer
from order.models import Order
from order.utils import recalc_tickets
from order.task import send_email

from django.contrib.auth.models import User


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            recalc_tickets(response.data['concert'], response.data['qty'])
            email = User.objects.get(id=response.data['user']).email
            send_email.delay(email, response.data['purchase_type'])
        return response
