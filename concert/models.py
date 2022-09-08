from django.db import models
from concert_type.models import ConcertType


class Concert(models.Model):
    """Main concert model"""

    name = models.CharField(max_length=20)
    performer = models.CharField(max_length=20)
    type = models.ForeignKey(ConcertType, on_delete=models.CASCADE)
    tickets_number = models.PositiveIntegerField(default=0)
    date = models.DateTimeField()
    address = models.TextField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    image = models.ImageField(upload_to="concert_images")
    description = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self) -> str:
        return f"Concert {self.name}"
