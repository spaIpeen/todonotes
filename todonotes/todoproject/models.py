from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField('Name of project', max_length=128, blank=False)
    link_to_git = models.URLField('Link to Git', max_length=256)
    owners = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    text = models.TextField('Text of notes', blank=False)
    is_active = models.BooleanField('Active', default=True)
    created = models.DateTimeField('Time of creating', auto_now_add=True)
    updated = models.DateTimeField('Time of updating', auto_now=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, models.PROTECT)
