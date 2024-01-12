from django.contrib import admin
from .models import MenuItem, Order

# ... (Twoje inne importy)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'table_number', 'created_at', 'updated_at')