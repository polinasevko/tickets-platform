from django.urls import path
from concert.views import ConcertDetailView, ConcertListView

urlpatterns = [
    path("", ConcertListView.as_view(), name="concert-list"),
    path("<int:pk>/", ConcertDetailView.as_view(), name="concert-detail"),
]
