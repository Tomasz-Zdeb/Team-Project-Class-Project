from django.db import models
from django.core.validators import MinValueValidator

class MenuItem(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nazwa')
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Cena',
        validators=[MinValueValidator(0)]
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Pozycja menu'
        verbose_name_plural = 'Pozycje menu'

class Order(models.Model):
    menu_items = models.ManyToManyField(MenuItem, verbose_name='Pozycje menu')
    table_number = models.IntegerField(
        verbose_name='Numer stolika',
        validators=[MinValueValidator(1)],
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Data utworzenia')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Data aktualizacji')

    def __str__(self):
        item_names = ', '.join([item.name for item in self.menu_items.all()])
        return f"Order {self.id} at table {self.table_number} containing: {item_names}"

    class Meta:
        verbose_name = 'Zamówienie'
        verbose_name_plural = 'Zamówienia'