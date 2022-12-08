from django.urls import path, include
from payments.views import ProcessWebhookView


urlpatterns = [
    path("paypal/", ProcessWebhookView.as_view()),
]
