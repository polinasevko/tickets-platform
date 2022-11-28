from time import sleep
from celery import shared_task
from django.core.mail import send_mail


@shared_task()
def send_email(email, purchase_type):
    sleep(5)
    if purchase_type == "RES":
        message = 'You successfully booked a ticket. Pay for it within 24 hours in your account.'
    else:
        message = 'You successfully bought a ticket. You can see it in your account.'
    send_mail(
        'Tickets platform',
        message,
        'tickets_platform@fastmail.com',
        [email]
    )
