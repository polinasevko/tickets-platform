from pyexpat import model
from django.db import models


class ConcertType(models.Model):
    name = models.CharField(max_length=20)
    slug = models.SlugField(unique=True)


class Concert(models.Model):
    name = models.CharField(max_length=20)
    type = models.ForeignKey(ConcertType, on_delete=models.CASCADE)
    tickets_number = models.PositiveIntegerField(default=0)
    date = models.DateTimeField()
    address = models.TextField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(max_length=200, blank=True, null=True)
    

class TypeCharacteristic(models.Model):
    concert_type = models.ForeignKey(ConcertType, on_delete=models.CASCADE)
    name = name = models.CharField(max_length=20)


class ValueOfCharacteristic(models.Model):
    type_characteristic = models.ForeignKey(TypeCharacteristic, on_delete=models.CASCADE)
    value = models.CharField(max_length=20)
    concerts = models.ManyToManyField(Concert, blank=True, related_name='characteristics')
    