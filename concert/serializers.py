from rest_framework import serializers
from concert.models import Concert, TypeCharacteristic, ValueOfCharacteristic


class ConcertListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = ('id', 'name', 'performer', 'date', 'address',)


class ConcertDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = '__all__'
