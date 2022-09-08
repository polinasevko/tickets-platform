from rest_framework import serializers
from concert_type.models import ConcertType


class ConcertTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertType
        fields = (
            "slug",
            "name",
        )
