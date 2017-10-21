from decorators import *
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from articles.models import *
from JsonDictConvertation import *
from django.views.decorators.csrf import csrf_exempt

shortcuts = {'edited': {'message': 'edited', 'status': 'OK'},
             'created': {'message': 'created', 'status': 'OK'},
             'articleDoesNotExist': {'message': 'article DoesNotExist', "status": 'FAIL'},
             'deleted': {'message': 'deleted', 'status': 'OK'},
             'onModeration': {'message': 'On moderation', 'status': 'FAIL'},
             'approved': {'message': 'approved', 'status': 'OK'},
             'permissionError': {'status': 'FAIL', 'message': 'PermissionError'},
             'wrongRequestMethod': {'message': 'Wrong request.Method', 'status': 'FAIL'},
             'invalidCategory': {'message': 'Invalid Category', 'status': 'FAIL'},
             'wrongArguments': {'message': 'Wrong Arguments', 'status': 'FAIL'}
             }


def HttpResponseJson(data):
    return HttpResponse(convertFromDictToJson(data),
                        content_type='application/json')
##TODO CHange about cat
@csrf_exempt
@requiredJsonAndPost
@staffMemberRequiredJson
def editArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    author = article.author
    approved = article.approved
    rating = article.rating
    data = convertFromJsonToDict(request)
    if not Category.objects.filter(name=data['category']).exists():
        return HttpResponseJson(shortcuts['invalidCategory'])
    form = ArticleForm(convertFromJsonToDict(data), instance=article)
    errors = form.errors.as_json()
    if form.is_valid():
        article = form.save(commit=False)
        article.author = author
        article.category = Category.objects.get(name=data['category'])
        article.rating = rating
        article.approved = approved
        article.save()
        return HttpResponseJson(shortcuts['edited'])
    else:
        return HttpResponse(convertFromDictToJson({'status':'FAIL','errors':json.loads(errors),'message':'Error'}), content_type='application/json')


@csrf_exempt
@requiredJsonAndPost
#@loginRequiredJson
def createArticle(request):
    # data = {'algorithm':request.GET.get('algorithm',''),
    #         'category':request.GET.get('category',''),
    #         'title':request.GET.get('title','')}
    data = convertFromJsonToDict(request)
    if not Category.objects.filter(name=data['category']).exists():
        cat = Category(name=data['category'])
        cat.save()
    form = ArticleForm(data)
    errors = form.errors
    if form.is_valid():
        article = form.save(commit=False)
        article.author = User.objects.get(pk=1) #request.user
        article.category = Category.objects.get(name=data['category'])
        article.save()
        return HttpResponseJson(shortcuts['created'])
    key,num = list(errors.items())[0]
    return HttpResponse(convertFromDictToJson({'status':'Fail','message':str(key)+':'+str(errors[str(key)][0])}), content_type='application/json')


@staffMemberRequiredJson
def deleteArticle(request, slug):
    try:
        instance = Article.objects.get(slug=slug)
        instance.delete()
    except Article.DoesNotExist:
        return HttpResponseJson(shortcuts['articleDoesNotExist'])
    return HttpResponseJson(shortcuts['deleted'])


def getArticle(request, slug):
    from unidecode import unidecode
    slug = (unidecode(slug))
    article = get_object_or_404(Article, slug=slug)
    if not (article.approved or request.user.is_staff):
        return HttpResponseJson(shortcuts['onModeration']),
    dictionary = {'article': article.toDict(), 'status': 'OK',
                  'comments': list(article.comment_set.values('comment', 'author__username'))}
    return HttpResponseJson(dictionary)


@loginRequiredJson
def rateArticle(request, slug, score):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponseJson(shortcuts['onModeration'])
    newRate, created = Rate.objects.get_or_create(user=request.user, article=article)
    if created:
        count = int(article.rate_set.all().count())
        newRating = ((count - 1) * article.rating + float(score)) / count
        article.rating = newRating
        article.save()
        return HttpResponseJson({'message': 'You voted!', "code": ''})
    return HttpResponseJson({'message': 'You already voted', "code": ''})


def getAllArticlesTitle(request):
    dictionary = {'result': Article.objects.getAllArticlesTitle(approved=True), 'status': 'OK'}
    return HttpResponseJson(dictionary)


@staffMemberRequiredJson
def approveArticle(request):
    if request.method != 'GET':
        return HttpResponseJson(shortcuts['wrongRequestMethod'])
    id = int(request.GET.get('id'))
    result = int(request.GET.get('result'))
    article = get_object_or_404(Article, id=id)
    if article.approved:
        return HttpResponseJson({'message': 'Already approved', 'code': ''})
    if result == 1:
        article.approved = True
        article.save()
        return HttpResponseJson(shortcuts['approved'])
    if result == 0:
        article.delete()
        return HttpResponseJson(shortcuts['deleted'])
    return HttpResponseJson(shortcuts['wrongArguments'])


##id must be
@staffMemberRequiredJson
def getArticlesOnModeration(request):
    dictionary = {'result': Article.objects.getAllArticlesTitle(approved=False), 'status': 'OK'}
    return HttpResponseJson(dictionary)


@loginRequiredJson
@requiredJsonAndPost
def commentArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponseJson(shortcuts['onModeration'])
    form = CommentForm(convertFromJsonToDict(request))
    errors = form.errors.as_json()
    if form.is_valid():
        comment = form.save(commit=False)
        comment.author = request.user
        comment.article = article
        comment.save()
        return HttpResponseJson(shortcuts['created'])
    return HttpResponse(convertFromDictToJson({'status':'FAIL','errors':json.loads(errors),'message':'Error'}), content_type='application/json')




@requiredJsonAndPost
@loginRequiredJson
def editComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponseJson(shortcuts['onModeration'])
    comment = get_object_or_404(Comment, id=comment_id)
    likes = comment.likes
    if not request.user == comment.author:
        return HttpResponse(shortcuts['permissionError'])
    article = comment.article
    form = CommentForm(convertFromJsonToDict(request), instance=comment)
    errors = form.errors.as_json()
    if form.is_valid():
        comment = form.save(commit=False)
        comment.article = article
        comment.author = request.user
        comment.likes = likes
        comment.save()
        return HttpResponseJson(shortcuts['edited'])
    else:
        return HttpResponse(errors, content_type='application/json')


@loginRequiredJson
def likeComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponseJson(shortcuts['onModeration'])
    comment = get_object_or_404(Comment, id=comment_id)
    newLike, created = Like.objects.get_or_create(user=request.user, comment=comment)
    if not created:
        comment.likes = comment.likes - 1
        comment.save()
        newLike.delete()
        return HttpResponseJson(shortcuts['deleted'])
    comment.likes += 1
    comment.save()
    return HttpResponseJson(shortcuts['created'])


@loginRequiredJson
def deleteComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponseJson(shortcuts['onModeration'])
    comment = get_object_or_404(Comment, id=comment_id)
    if (not comment.author == request.user) and (not request.user.is_staff):
        return HttpResponseJson(shortcuts['permissionError'])
    comment.delete()
    return HttpResponseJson(shortcuts['deleted'])


def getAllComments(request, slug):
    article = get_object_or_404(Article, slug=slug)
    dictionaries = [obj.toDict() for obj in article.comment_set.all()]
    return HttpResponseJson(dictionaries)

def getAllCategories(request):
    result=[]
    for cat in Category.objects.all():
        result.append(cat.name)
    return HttpResponseJson({'status':'OK','result':{'allCategories':result}})