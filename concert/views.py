from rest_framework import generics, permissions
from concert.serializers import (ConcertListSerializer, ConcertDetailSerializer)
from concert.models import Concert

class ConcertListView(generics.ListAPIView):
    queryset = Concert.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ConcertListSerializer


class ConcertDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Concert.objects.all()
    serializer_class = ConcertDetailSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

