from decorators import *
from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from articles.models import *
from JsonDictConvertation import *


@staff_member_required_json
def editArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    author = article.author
    if request.method == 'POST':
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

    else:
        opts = ArticleForm._meta
        object_data = model_to_dict(article, opts.fields, opts.exclude)
        return HttpResponse(convertFromDictToJson(object_data), content_type='application/json')


@json_and_post_required
@login_required_json
def createArticle(request):
    form = ArticleForm(convertFromJsonToDict(request))
    errors = form.errors.as_json()
    if form.is_valid():
        article = form.save(commit=False)
        article.author = request.user
        article.save()
        return HttpResponse(convertFromDictToJson({'message': 'created', 'code': ''}),
                            content_type='application/json')

    return HttpResponse(errors, content_type='application/json')


@staff_member_required_json
def deleteArticle(request, slug):
    try:
        instance = Article.object.get(slug=slug)
        instance.delete()
    except Article.DoesNotExist:
        return HttpResponse(convertFromDictToJson({'message': 'article DoesNotExist', "code": ''}),
                            content_type='application/json')
    return HttpResponse(convertFromDictToJson({'message': 'deleted', "code": ''}), content_type='application/json')


@login_required_json
def getArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    dict = {}
    dict['title'] = article.title
    dict['text'] = article.text
    dict['author'] = article.author.username
    dict['rating'] = article.rating
    return HttpResponse(convertFromDictToJson(dict),
                        content_type='application/json')


@login_required_json
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


@staff_member_required_json
def approveArticle(request, slug):
    article = get_object_or_404(Article, slug=slug)
    article.approved = True
    article.save()
    return HttpResponse(convertFromDictToJson({'message': 'approved', "code": ''}), content_type='application/json')


@staff_member_required_json
def getArticlesOnModeration(request):
    from django.core import serializers
    objectQuerySet = Article.object.filter(approved=False)
    data = serializers.serialize('json', objectQuerySet, fields=('author', 'slug', 'text'))
    return HttpResponse(data, content_type='application/json')


@login_required_json
@json_and_post_required
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


@login_required_json
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
    if request.method == "POST":
        form = CommentForm(request, instance=comment)
        errors = form.errors.as_json()
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.author = request.user
            comment.save()
            return HttpResponse(convertFromDictToJson({'message': 'edited', 'code': ''}),
                                content_type='application/json')
        else:
            return HttpResponse(errors, content_type='application/json')

    else:
        opts = CommentForm._meta
        object_data = model_to_dict(comment, opts.fields, opts.exclude)
        return HttpResponse(convertFromDictToJson(object_data), content_type='application/json')


@login_required_json
def likeComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    newLike, created = Like.objects.get_or_create(user=request.user, comment_id=comment_id)
    if not created:
        newLike.delete()
        return HttpResponse({'message': 'deleted', 'code': ''}, content_type='application/json')
    return HttpResponse({'message': 'created', 'code': ''}, content_type='application/json')


@login_required_json
def deleteComment(request, slug, comment_id):
    article = get_object_or_404(Article, slug=slug)
    if not article.approved:
        return HttpResponse(convertFromDictToJson({'message': 'On moderation', 'code': ''}),
                            content_type='application/json')
    comment = get_object_or_404(Comment, id=comment_id)
    if not comment.author == request.user or not request.user.is_staff:
        return HttpResponse(convertFromDictToJson({'code': '', 'message': 'PermissionError'}),
                            content_type='application/json')
    comment.delete()
    return HttpResponse({'message': 'deleted', 'code': ''}, content_type='application/json')
