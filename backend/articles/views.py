from decorators import *
from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from articles.models import *
from JsonDictConvertation import *

shortcuts = {'edited': {'message': 'edited', 'code': ''},
             'created': {'message': 'created', 'code': ''},
             'articleDoesNotExist': {'message': 'article DoesNotExist', "code": ''},
             'deleted': {'message': 'deleted', "code": ''},
             'onModeration': {'message': 'On moderation', 'code': ''},
             'approved': {'message': 'approved', "code": ''},
             'permissionError': {'code': '', 'message': 'PermissionError'}
             }


# ok
@requiredJsonAndPost
@staffMemberRequiredJson
def editArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    author = article.author
    form = ArticleForm(convertFromJsonToDict(request), instance=article)
    errors = form.errors.as_json()
    if form.is_valid():
        article = form.save(commit=False)
        article.author = author
        article.save()
        return HttpResponse(convertFromDictToJson({'message': 'edited', 'code': ''}),
                            content_type='application/json')  # or
    else:
        return HttpResponse(errors, content_type='application/json')


# ok
@requiredJsonAndPost
@loginRequiredJson
def createArticle(request):
    data = convertFromJsonToDict(request)
    if not Category.objects.filter(name=data['category']).exists():
        return HttpResponse(convertFromDictToJson({'message': 'Invalid Category', 'code': ''}),
                            content_type='application/json')

    form = ArticleForm(data)
    errors = form.errors.as_json()
    if form.is_valid():
        article = form.save(commit=False)
        article.author = request.user
        article.category = Category.objects.get(name=data['category'])
        article.save()
        return HttpResponse(convertFromDictToJson({'message': 'created', 'code': ''}),
                            content_type='application/json')
    return HttpResponse(errors, content_type='application/json')


# ok
@staffMemberRequiredJson
def deleteArticle(request, slug):
    try:
        instance = Article.objects.get(slug=slug)
        instance.delete()
    except Article.DoesNotExist:
        return HttpResponse(convertFromDictToJson({'message': 'article DoesNotExist', "code": ''}),
                            content_type='application/json')
    return HttpResponse(convertFromDictToJson({'message': 'deleted', "code": ''}), content_type='application/json')


# ok
@loginRequiredJson
def getArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    return HttpResponse(convertFromDictToJson(article.toDict()),
                        content_type='application/json')


# ok
@loginRequiredJson
def rateArticle(request, slug, score):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    newRate, created = Rate.objects.get_or_create(user=request.user, article=article)
    if created:
        count = int(article.rate_set.all().count())
        newRating = ((count - 1) * article.rating + float(score)) / count
        article.rating = newRating
        article.save()
        return HttpResponse(convertFromDictToJson({'message': 'You voted!', "code": ''}),
                            content_type='application/json')
    return HttpResponse(convertFromDictToJson({'message': 'You already voted', "code": ''}),
                        content_type='application/json')


# #cache upgrade required
def getAllArticles(request):
    dictionaries = [obj.toDict() for obj in Article.objects.filter(approved=True)]
    return HttpResponse(convertFromDictToJson(dictionaries),
                        content_type='application/json')


# ok
@staffMemberRequiredJson
def approveArticle(request):
    if request.method != 'GET':
        return HttpResponse(convertFromDictToJson({'message': 'Wrong request.Method', "code": ''}),
                            content_type='application/json')
    id = int(request.GET.get('id'))
    result = int(request.GET.get('result'))
    article = get_object_or_404(Article, id=id)
    if result == 1:
        article.approved = True
        article.save()
        return HttpResponse(convertFromDictToJson({'message': 'approved', "code": ''}), content_type='application/json')
    else:
        article.delete()
        return HttpResponse(convertFromDictToJson({'message': 'deleted', "code": ''}), content_type='application/json')


# ok #cache upgrade required
@staffMemberRequiredJson
def getArticlesOnModeration(request):
    dictionaries = [obj.toDict() for obj in Article.objects.filter(approved=False)]
    return HttpResponse(convertFromDictToJson(dictionaries), content_type='application/json')


#
@loginRequiredJson
@requiredJsonAndPost
def commentArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    form = CommentForm(convertFromJsonToDict(request))
    errors = form.errors.as_json()
    if form.is_valid():
        comment = form.save(commit=False)
        comment.author = request.user
        comment.article = article
        comment.save()
        return HttpResponse(convertFromDictToJson({'message': 'created', 'code': ''}),
                            content_type='application/json')
    return HttpResponse(errors, content_type='application/json')


# comment -  too much code refactor this
@requiredJsonAndPost
@loginRequiredJson
def editComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    comment = get_object_or_404(Comment, id=comment_id)
    if not request.user == comment.author:
        return HttpResponse(convertFromDictToJson({'code': '', 'message': 'PermissionError'}),
                            content_type='application/json')
    article = comment.article
    form = CommentForm(convertFromJsonToDict(request), instance=comment)
    errors = form.errors.as_json()
    if form.is_valid():
        comment = form.save(commit=False)
        comment.article = article
        comment.author = request.user
        comment.save()
        return HttpResponse(convertFromDictToJson({'message': 'edited', 'code': ''}),
                            content_type='application/json')
    else:
        return HttpResponse(errors, content_type='application/json')  # ok


#
@loginRequiredJson
def likeComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    comment = get_object_or_404(Comment, id=comment_id)
    newLike, created = Like.objects.get_or_create(user=request.user, comment=comment)
    if not created:
        comment.likes = comment.likes - 1
        comment.save()
        newLike.delete()
        return HttpResponse(convertFromDictToJson({'message': 'deleted', 'code': ''}), content_type='application/json')
    comment.likes += 1
    comment.save()
    return HttpResponse(convertFromDictToJson({'message': 'created', 'code': ''}), content_type='application/json')


# ok
@loginRequiredJson
def deleteComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    comment = get_object_or_404(Comment, id=comment_id)
    if (not comment.author == request.user) and (not request.user.is_staff):
        return HttpResponse(convertFromDictToJson({'code': '', 'message': 'PermissionError'}),
                            content_type='application/json')
    comment.delete()
    return HttpResponse(convertFromDictToJson({'message': 'deleted', 'code': ''}), content_type='application/json')


# ok just  check what return
def getAllComments(request, slug):
    article = get_object_or_404(Article, slug=slug)
    dictionaries = [obj.toDict() for obj in article.comment_set.all()]
    return HttpResponse(convertFromDictToJson(dictionaries),
                        content_type='application/json')




    # def ArticleStatus(article):
    #    if not article.approved:
    #        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
    #                            content_type='application/json')
