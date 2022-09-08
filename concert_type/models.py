from django.db import models


class ConcertType(models.Model):
    """Type of concert: classic, open air etc"""

    name = models.CharField(max_length=20)
    slug = models.SlugField(unique=True)

    def __str__(self) -> str:
        return f"Type {self.name}"
