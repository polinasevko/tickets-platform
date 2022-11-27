from rest_framework import viewsets, permissions
from order.serializers import OrderSerializer
from order.models import Order
from order.utils import recalc_tickets


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            recalc_tickets(response.data['concert'], response.data['qty'])
        return response
