# Generated by Django 4.1 on 2022-09-15 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("concert", "0005_alter_concert_description_alter_concert_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="concert",
            name="description",
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
