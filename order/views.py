from rest_framework import viewsets, permissions, generics
from order.serializers import OrderSerializer
from order.models import Order
from order.utils import recalc_tickets
from order.task import send_email

from django.contrib.auth.models import User

from rest_framework_simplejwt.authentication import JWTAuthentication


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            recalc_tickets(response.data['concert'], response.data['qty'])
            email = User.objects.get(id=response.data['user']).email
            send_email.delay(email, response.data['purchase_type'])
            print(self.request.user)
        return response

    
class OrderUMyView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        return user.order_set.all()
