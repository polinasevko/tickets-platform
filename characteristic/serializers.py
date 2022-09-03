from rest_framework import serializers
from characteristic.models import TypeCharacteristic, ValueOfCharacteristic
from concert_type.serializers import ConcertTypeSerializer


class TypeCharacteristicSerializer(serializers.ModelSerializer):
    concert_type = ConcertTypeSerializer()
    class Meta:
        model = TypeCharacteristic
        fields = ('concert_type', 'name')


class ValueOfCharacteristicSerializer(serializers.ModelSerializer):
    type_characteristic = TypeCharacteristicSerializer()
    class Meta:
        model = ValueOfCharacteristic
        fields = ('type_characteristic', 'value')
