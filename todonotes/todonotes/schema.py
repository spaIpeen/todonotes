import graphene
from graphene_django import DjangoObjectType

from todoproject.models import ToDo, Project
from users.models import User


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todoes = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_todoes(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
