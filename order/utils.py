from concert.models import Concert
from datetime import timedelta
from django.utils import timezone

def recalc_tickets(concert_id, order_qty):
    concert = Concert.objects.get(id=concert_id)
    concert.tickets_number -= order_qty
    concert.save()

def check_date(user):
    orders = user.order_set.filter(is_paid=False)
    for order in orders:
        if timezone.now() - timedelta(hours=24) > order.created_at:
            order.purchase_type = "EXP"
            order.save()
            recalc_tickets(order.concert_id, -order.qty)