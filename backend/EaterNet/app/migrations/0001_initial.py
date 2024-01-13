# Generated by Django 4.2.7 on 2024-01-06 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Produkt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=255)),
                ('cena', models.DecimalField(decimal_places=2, max_digits=10)),
                ('dostępność', models.BooleanField(default=True)),
            ],
        ),
    ]
