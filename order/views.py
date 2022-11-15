from rest_framework import viewsets, permissions
from order.serializers import OrderSerializer
from order.models import Order


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order
    
    # def get_queryset(self):
    #     qs = super().get_queryset() # вызов родительского метода
    #     return qs.filter(user = self.request.user)
        # return self.request.user.order_set.all()
        # .filter(course=self.kwargs['course_pk'])
