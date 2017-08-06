from django.test import TestCase
from JsonDictConvertation import *
from django.test.client import Client
from  articles.models import Article
from  django.contrib.auth.models import User



class TestArticle(TestCase):
    def setUp(self):
        self.client = Client()
        User.objects.create_superuser('nikita', 'dfj@mail.ru', 'dungeons')
        User.objects.create_user(username='moderator', email='moderator@mail.ru', password='moderator', is_staff=True,
                                 is_active=True, is_superuser=False)
        User.objects.create_user(username='usual', email='usual@mail.ru', password='usualusual', is_staff=False,
                                 is_active=True)

        User.objects.create_user(username='inactive', email="inactive@mail.ru", password='inactiveuser', is_staff=False,
                                 is_active=False)

    def testCreateEditDelteArticleModerator(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        self.assertEqual({'code': '', 'message': 'success'}, response.json())

        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        response = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                    content_type='application/json')
        self.assertEqual({'message': 'created', 'code': ''}, response.json())

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/edit/')
        self.assertEqual({'text': 'this is text', 'title': 'helloworld'}, response.json())
        jsonData = convertFromDictToJson({'title': 'first', 'text': 'text'})
        response = self.client.post('http://127.0.0.1:8000/api/article/helloworld/edit/', jsonData,
                                    content_type='application/json')
        self.assertEqual({'message': 'edited', 'code': ''}, response.json())

        response = self.client.post('http://127.0.0.1:8000/api/article/first/delete/', jsonData,
                                    content_type='application/json')
        self.assertEqual({'message': 'deleted', 'code': ''}, response.json())

    def testCreateEditDeleteArticleUser(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=usual&password=usualusual')
        self.assertEqual({'code': '', 'message': 'success'}, response.json())

        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        response = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                    content_type='application/json')
        self.assertEqual({'message': 'created', 'code': ''}, response.json())

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/edit/')
        self.assertEqual({'code': '', 'message': 'no_permission'}, response.json())
        jsonData = convertFromDictToJson({'title': 'first', 'text': 'text'})
        response = self.client.post('http://127.0.0.1:8000/api/article/helloworld/edit/', jsonData,
                                    content_type='application/json')
        self.assertEqual({'message': 'no_permission', 'code': ''}, response.json())

        response = self.client.post('http://127.0.0.1:8000/api/article/helloworld/delete/', jsonData,
                                    content_type='application/json')
        self.assertEqual({'message': 'no_permission', 'code': ''}, response.json())
