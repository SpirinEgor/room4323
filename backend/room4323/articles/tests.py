from django.test import TestCase
from JsonDictConvertation import *
from django.test.client import Client
from  articles.models import Article
from  django.contrib.auth.models import User


class TestArticlesApp(TestCase):
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

    def testCreateEditDeleteArticleUsualUser(self):
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

    def testApproveArticle(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        response = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                    content_type='application/json')
        response = self.client.get('http://127.0.0.1:8000/api/moderation/helloworld/approve')
        self.assertEqual({'message': 'approved', "code": ''}, response.json())

        response = self.client.get('http://127.0.0.1:8000/api/moderation/unexcitingArticle/approve')
        self.assertEqual(404, response.status_code)

    def testGetArticlesOnModeration(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        python_dict = {'text': 'this is text', 'title': 'first'}
        firstArticle = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                        content_type='application/json')
        python_dict = {'text': 'this is text', 'title': 'second'}
        secondArticle = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                         content_type='application/json')
        python_dict = {'text': 'this is text', 'title': 'third'}
        thirdArticle = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                        content_type='application/json')
        response = self.client.get('http://127.0.0.1:8000/api/moderation/first/approve',
                                   content_type='application/json')
        response = self.client.get('http://127.0.0.1:8000/api/moderation/all/',
                                   content_type='application/json')

        self.assertEqual(
            [{'fields': {'slug': 'second', 'author': 2, 'text': 'this is text'}, 'model': 'articles.article', 'pk': 2},
             {'fields': {'slug': 'third', 'author': 2, 'text': 'this is text'}, 'model': 'articles.article', 'pk': 3}],
            response.json())

    def testGetArticle(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        response = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                    content_type='application/json')
        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/get', content_type='application/json')
        self.assertEqual({'message': 'On moderation', "code": ''}, response.json())
        response = self.client.get('http://127.0.0.1:8000/api/moderation/helloworld/approve')
        self.assertEqual({'message': 'approved', "code": ''}, response.json())

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/get', content_type='application/json')
        self.assertEqual({'rating': 0.0, 'author': 'moderator', 'text': 'this is text', 'title': 'helloworld'},
                         response.json())
        response = self.client.get('http://127.0.0.1:8000/api/article/no/get', content_type='application/json')
        self.assertEqual(404, response.status_code)

    def testRateArticle(self):
        response = self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        response = self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                                    content_type='application/json')
        response = self.client.get('http://127.0.0.1:8000/api/moderation/helloworld/approve')

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/rate/4')

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/rate/4')
        self.assertEqual({'message': 'You already voted', 'code': ''}, response.json())
        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/get', content_type='application/json')
        self.assertEqual({'rating': 4.0, 'author': 'moderator', 'text': 'this is text', 'title': 'helloworld'},
                         response.json())

        self.client.get('http://127.0.0.1:8000/api/authentification/logout/')
        self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=usual&password=usualusual')
        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/rate/3')

        response = self.client.get('http://127.0.0.1:8000/api/article/helloworld/get', content_type='application/json')
        self.assertEqual({'rating': 3.5, 'author': 'moderator', 'text': 'this is text', 'title': 'helloworld'},
                         response.json())

    def testCommentArticle(self):
        self.client.get('http://127.0.0.1:8000/api/authentification/auth?login=moderator&password=moderator')
        python_dict = {'text': 'this is text', 'title': 'helloworld'}
        self.client.post('http://127.0.0.1:8000/api/article/create/', json.dumps(python_dict),
                         content_type='application/json')
        self.client.get('http://127.0.0.1:8000/api/moderation/helloworld/approve')
        response = self.client.post('http://127.0.0.1:8000/api/article/helloworld/comment',
                                    json.dumps({'comment': 'comment'}),
                                    content_type='application/json')
        self.assertEqual({'message': 'created', 'code': ''}, response.json())
        response = self.client.post('http://127.0.0.1:8000/api/article/helloworld/comment',
                                    json.dumps({'comment': 'comment'}),
                                    content_type='application/json')
        self.assertEqual({'message': 'created', 'code': ''}, response.json())

    def testEditComment(self):
        pass

    def testDeleteComment(self):
        pass

    def testLikeComment(self):
        pass


##also need check get all comments best and latest/ also articles