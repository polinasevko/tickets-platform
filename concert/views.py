from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from concert.serializers import ConcertListSerializer, ConcertDetailSerializer
from concert.models import Concert
from concert.filter import ConcertFilter


class ConcertListView(generics.ListAPIView):
    queryset = Concert.objects.filter(date__gte=timezone.now()).order_by('date')
    permission_classes = [permissions.AllowAny]
    serializer_class = ConcertListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ConcertFilter
    search_fields = ['name', 'performer']


class ConcertDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Concert.objects.all()
    serializer_class = ConcertDetailSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [permissions.AllowAny]
            # self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()
