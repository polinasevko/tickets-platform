# Generated by Django 4.1 on 2022-09-03 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("concert", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="concert",
            name="performer",
            field=models.CharField(default="default", max_length=20),
            preserve_default=False,
        ),
    ]
