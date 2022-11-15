from django.db import models
from django.contrib.auth.models import User
from concert.models import Concert


class Order(models.Model):
    """Order of ticket model"""

    class PurchaseType(models.TextChoices):
        RESERVE = "RES", "Reserve"
        BUY = "BUY", "Buy"
        CANCELLED = "CND", "Cancelled"
        EXPIRED = "EXP", "Expired"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    purchase_type = models.CharField(
        max_length=3, choices=PurchaseType.choices, default=PurchaseType.RESERVE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return f"Order {self.id} of concert {self.concert}"
