from rest_framework import serializers
from concert.models import Concert
from concert_type.serializers import ConcertTypeSerializer
from characteristic.serializers import ValueOfCharacteristicSerializer


class ConcertListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = ('id', 'name', 'performer', 'date', 'address',)


class ConcertDetailSerializer(serializers.ModelSerializer):
    type = ConcertTypeSerializer()
    characteristics = ValueOfCharacteristicSerializer(many=True)
    class Meta:
        model = Concert
        fields = (
            'name', 
            'performer', 
            'type', 
            'tickets_number', 
            'date', 
            'address', 
            'price', 
            'image', 
            'description', 
            'characteristics'
            )
