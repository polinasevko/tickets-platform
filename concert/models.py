from django.db import models
from concert_type.models import ConcertType


class Concert(models.Model):
    '''Main concert model'''
    name = models.CharField(max_length=20)
    performer  = models.CharField(max_length=20)
    type = models.ForeignKey(ConcertType, on_delete=models.CASCADE)
    tickets_number = models.PositiveIntegerField(default=0)
    date = models.DateTimeField()
    address = models.TextField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    image = models.ImageField()
    description = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self) -> str:
        return f'Concert {self.name}'
    

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
    