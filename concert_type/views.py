from rest_framework import viewsets, permissions
from concert_type.serializers import ConcertTypeSerializer
from concert_type.models import ConcertType


class ConcertTypeView(viewsets.ModelViewSet):
    serializer_class = ConcertTypeSerializer
    queryset = ConcertType.objects.all()

    def get_permissions(self):
        if self.action in ["retrieve", "list"]:
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()
