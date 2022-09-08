from django_filters.rest_framework import FilterSet
from django_filters import DateFilter, CharFilter, DateFromToRangeFilter
from concert.models import Concert


class ConcertFilter(FilterSet):
    date = DateFromToRangeFilter(field_name='date__date')
    type = CharFilter(field_name='type__slug', lookup_expr='iexact')
    address = CharFilter(field_name='address', lookup_expr='icontains')

    class Meta:
        model = Concert
        fields = ['date', 'type', 'address']

