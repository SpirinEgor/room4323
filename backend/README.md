


# Api


### some shortcuts:   return object - HttpResponse with content_type= 'application/json'

|shortcut                                              | ReturnValue|
|---|---|
|login_required                         |{'code': '', 'message': 'login_required'}|
|staff_member_required                  |{'code': '', 'message': 'no_permission'}|
|json_and_post_required                 |{'code': '', 'message': 'Wrong content_type'/'Wrong request.method'}|
|error|{'field': [{'message': 'Some message.', 'code': 'some code'}]}|
|moderation|{'message': 'On moderation', 'code': ''}|
|deleted|{'message': 'deleted', 'code': ''} |

### Authentification : return object-HttpResponse with content_type= 'application/json'

|Request                                            | request.method  | ReturnValue         |  
|------                                              |--- | ---                           |
|api/authentification/auth?login=somelogin&password=pass| GET | {'code':'' ,'message':'success/failed'}   |
|api/authentification/logout/                       | GET | {'code': "",'message':'success'}          |
|api/authentification/signup/  |POST  |{'code': "", 'message': 'Activate Your Account'}/error/json_and_post_required |
|api/authentification/activate/uidb64/token/| GET|{'code': "", 'message': 'Account activated/Invalid account or link'} |

Description:
api/authentification/signup/ If success then on email will be sent message with link to activate account



### Article  return object-HttpResponse with content_type= 'application/json' or 404 error

|Request             |method                                     | ReturnValue|
|---               |---                                                |---        |
|api/article/create|POST|{'code':'','message':'created'}/login_required/json_and_post_required/error|
|api/article/slug/delete|GET|{'message': 'article DoesNotExist'/deleted, "code": ''}|
|api/article/slug/get |GET|login_required/404/moderation/{'title':'some','text':'text','author':'username','rating':float}|
|api/article/slug/rate/score|GET|404/login_required/moderation/{'message': 'You voted!/You already voted', "code": ''}|
|api/article/get/all|GET|[{'title': 'first', 'author': 'username', 'created': '2017-08-08 08:10:29.792258+00:00', 'rating': 0.0, 'text': 'text', 'updated': '2017-08-08 08:10:29.797619+00:00'},...{...}]|
|api/aricle/slug/edit|GET/POST|staff_member_required/error/{'message': 'edited', 'code': ''}/{'text': 'text', 'title': 'title'}

Description:
slug - slugified title

api/article/slug/rate/score : score must be between 1 and 5

api/article/get/all - return all approved articles or empty if nothing approved

api/article/slug/get return article as json or shorcut moderation if not approved

api/article/create  create in table new article but that article will be on moderation

api/aricle/slug/edit depend on request method. If Get then return  json  with text and title. If Post then update article in table


### Comments:return object-HttpResponse with content_type= 'application/json' or 404 error

|Request         |method                                     | ReturnValue|
|---             |---                                                |---        |
|api/article/slug/comment| POST  |404/login_required/json_and_post_required/moderation/{'message': 'created', 'code': ''}/error
|api/article/slug/comment_id/like| GET   |  login_required/404/deleted/{'message': 'created', 'code': ''}|
|api/article/slug/comment_id/edit |GET/POST |login_required/404/moderation/{'code': '', 'message': 'PermissionError'}/{'message': 'edited', 'code': ''}/error/{'comment': 'comment'}|
|api/article/slug/comment_id/delete|GET   | 404/{'code': '', 'message': 'PermissionError'}/moderation/deleted/login_required|
|api/article/slug/comments/all | GET  | [{'updated': '2017-08-08 08:52:28.094846+00:00', 'created': '2017-08-08 08:52:28.094835+00:00','likes': 0, 'comment': 'firstComment', 'author': 'moderator'},....]|

Description:

api/article/slug/comments/all return all comments  related to this article(slug)

api/article/slug/comment_id/like  create  or delete like by user

api/article/slug/comment_id/edit depend on request method. If Get then return  json  with comment. If Post then update comment in table

api/article/slug/comment if all ok then save comment in table  else  return json with error information

### Moderation :  return object-HttpResponse with content_type='application/json' or 404 error

|Request         |method                                     | ReturnValue|
|---             |---                                                |---        |
|api/moderation/slug/approve|POST|staff_member_required_json/{'message': 'approved', "code": ''}/404|
|api/moderation/all| GET|staff_member_required_json/[{'fields': {'author': id, 'text': 'this is text', 'slug': 'second'}, 'model': 'articles.article', 'pk': 2}, {'fields': {'author': id, 'text': 'this is text', 'slug': 'third'}, 'model': 'articles.article', 'pk': 3}]|

Description:

api/moderation/all return all articles on moderation

api/moderation/slug/approve - change field approve to True


