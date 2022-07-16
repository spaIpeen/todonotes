from mixer.backend.django import mixer
from django.test import TestCase
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from rest_framework import status

from todoproject.models import Project, ToDo
from users.views import UserCustomViewSet


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(TestCase):

    def test_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.put(f'/api/project/{project.id}/', {'name': 'Project2'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestToDoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit(self):
        todo = mixer.blend(ToDo, text='TodoProject1')
        response = self.client.put(f'/api/todo/{todo.id}/', {'text': 'TodoProject2', 'project': todo.project.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'TodoProject1')
