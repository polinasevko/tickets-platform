from rest_framework import viewsets, permissions
from order.serializers import OrderSerializer
from order.models import Order


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        print(self.request.user)
        return self.request.user.order_set.all()
        # .filter(course=self.kwargs['course_pk'])
