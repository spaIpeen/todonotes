from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


class User(models.Model):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField('username', max_length=64, unique=True, validators=[username_validator], blank=True)
    first_name = models.CharField('first name', max_length=64)
    last_name = models.CharField('last name', max_length=64)
    email = models.EmailField('email address', unique=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username
