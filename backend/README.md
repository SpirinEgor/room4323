


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
|articleDoesNotExist|{'message': 'article DoesNotExist', "code": ''}|
|approved|{'message': 'approved', "code": ''}|
|permissionError|{'code': '', 'message': 'PermissionError'}|
|wrongRequestMethod|{'message': 'Wrong request.Method', "code": ''}|
|invalidCategory|{'message': 'Invalid Category', 'code': ''}|
|wrongArguments|{'message': 'Wrong Arguments', 'code': ''}|
|created|{'message': 'created', 'code': ''}|


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
|api/article/create|POST|created/login_required/json_and_post_required/error/invalidCategory|
|api/article/slug/delete|GET|articleDoesNotExist/deleted/staff_member_required  |
|api/article/slug/get |GET|404/moderation/{'status':'ok','article':{...},''comments':{...}}|
|api/article/slug/rate/score|GET|404/login_required/moderation/{'message': 'You voted!/You already voted', "code": ''}|
|api/article/get/all|GET|{'status':'ok',result:{'category':{...},...}} |
|api/aricle/slug/edit|POST|staff_member_required/error/edited/invalidCategory/json_and_post_required|

Description:
slug - slugified title

api/article/slug/rate/score : score must be between 1 and 5

api/article/get/all - return all approved articlesTitle

api/article/slug/get return article as json with comments or shorcut moderation if not approved

api/article/create  create in table new article but that article will be on moderation. input {'title':'bla',text:"..."}

api/aricle/slug/edit input {'title':'bla',text:"..."}


### Comments:return object-HttpResponse with content_type= 'application/json' or 404 error

|Request         |method                                     | ReturnValue|
|---             |---                                                |---        |
|api/article/slug/comment| POST  |404/login_required/json_and_post_required/moderation/created/error|
|api/article/slug/comment_id/like| GET   |  login_required/404/deleted/created/moderation|
|api/article/slug/comment_id/edit |POST |login_required/404/moderation/permissionError/edited/error/json_and_post_required|
|api/article/slug/comment_id/delete|GET   | 404/permissionError/moderation/deleted/login_required|
|api/article/slug/comments/all | GET  | [{'likes': 0, 'comment': 'firstComment', 'author': 'moderator'},....]|

Description:

api/article/slug/comments/all return all comments  related to this article(slug)

api/article/slug/comment_id/like  create  or delete like by user

api/article/slug/comment_id/edit  input must  contain field comment

api/article/slug/comment input must  contain field comment

### Moderation :  return object-HttpResponse with content_type='application/json' or 404 error

|Request         |method                                     | ReturnValue|
|---             |---                                                |---        |
|api/moderation/slug/approve|GET|staff_member_required_json/approved/404/deleted/wrongArguments|
|api/moderation/all| GET|staff_member_required_json/[{'fields': {'author': id, 'text': 'this is text', 'slug': 'second'}, 'model': 'articles.article', 'pk': 2}, {'fields': {'author': id, 'text': 'this is text', 'slug': 'third'}, 'model': 'articles.article', 'pk': 3}]|

Description:

api/moderation/all return all articlesTitle on moderation

api/moderation/approve?id=article.id&result=1/0  1- approve 0- delete


