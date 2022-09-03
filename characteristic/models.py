from django.db import models
from concert_type.models import ConcertType
from concert.models import Concert


class TypeCharacteristic(models.Model):
    '''Characteristic inherent in a particular type of concert: composer for classic concert type'''
    concert_type = models.ForeignKey(ConcertType, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return f'Type characteristic {self.name}'


class ValueOfCharacteristic(models.Model):
    '''Value of a particular characteristic: composer (for classic) - Ludovico Einaudi'''
    type_characteristic = models.ForeignKey(TypeCharacteristic, on_delete=models.CASCADE)
    value = models.CharField(max_length=20)
    concerts = models.ManyToManyField(Concert, blank=True, related_name='characteristics')

    def __str__(self) -> str:
        return f'Characteristic value {self.value}'
    