from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    data = [
        {
            'username': 'admin',
            'email': 'root@ya.ru',
            'password': 'xs$rNHDVe2E',
            'is_superuser': True,
            'is_staff': True
        },
        {
            'username': 'ivan',
            'email': 'ivan@ya.ru',
            'password': 'rHG936SB@8s',
            'is_superuser': False,
            'is_staff': False
        },
        {
            'username': 'petr',
            'email': 'petr@ya.ru',
            'password': 'vb#SD7yCu27',
            'is_superuser': False,
            'is_staff': False
        }
    ]

    def handle(self, *args, **options):
        for user in self.data:
            User.objects.create_user(
                user['username'],
                user['email'],
                user['password'],
                is_superuser=user['is_superuser'],
                is_staff=user['is_staff']
            )
