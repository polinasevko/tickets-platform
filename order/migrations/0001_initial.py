# Generated by Django 4.1 on 2022-10-14 10:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("concert", "0006_alter_concert_description"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("qty", models.PositiveIntegerField(default=1)),
                ("total_price", models.DecimalField(decimal_places=2, max_digits=12)),
                (
                    "purchase_type",
                    models.CharField(
                        choices=[("RES", "Reserve"), ("BUY", "Buy")],
                        default="RES",
                        max_length=3,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_paid", models.BooleanField(default=False)),
                ("paid_at", models.DateTimeField(blank=True, null=True)),
                (
                    "concert",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="concert.concert",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
