from rest_framework import generics, permissions
from concert.serializers import (ConcertListSerializer, ConcertDetailSerializer)
from concert.models import Concert

class ConcertListView(generics.ListAPIView):
    queryset = Concert.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ConcertListSerializer


class ConcertDetailView(generics.RetrieveAPIView):
    queryset = Concert.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ConcertDetailSerializer

