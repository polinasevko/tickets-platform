from rest_framework import serializers
from concert.models import Concert
from concert_type.serializers import ConcertTypeSerializer
from characteristic.serializers import ValueOfCharacteristicSerializer


class ConcertListSerializer(serializers.ModelSerializer):
    type = ConcertTypeSerializer()
    # date = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = Concert
        fields = ("id", "type", "name", "performer", "date", "address", "image")


class ConcertDetailSerializer(serializers.ModelSerializer):
    type = ConcertTypeSerializer()
    characteristics = ValueOfCharacteristicSerializer(many=True)

    class Meta:
        model = Concert
        fields = (
            "name",
            "performer",
            "type",
            "tickets_number",
            "date",
            "address",
            "price",
            "image",
            "description",
            "characteristics",
        )
