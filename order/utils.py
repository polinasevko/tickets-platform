from concert.models import Concert

def recalc_tickets(concert_id, order_qty):
    concert = Concert.objects.get(id=concert_id)
    concert.tickets_number -= order_qty
    concert.save()