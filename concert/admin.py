from django.contrib import admin
from .models import *


admin.site.register(ConcertType)
admin.site.register(Concert)
admin.site.register(TypeCharacteristic)
admin.site.register(ValueOfCharacteristic)
