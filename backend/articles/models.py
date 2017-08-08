from django.db import models
from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.template.defaultfilters import slugify
from django.utils import timezone


# get_auersy set or smth else?
class ArticleManager(models.Manager):
    def latest(self):
        return self.order_by('-created')

    def best(self):
        return self.get_queryset().order_by('rating')


class Article(models.Model):
    object = ArticleManager()
    title = models.CharField(max_length=60, unique=True, verbose_name="Title")
    text = models.TextField(verbose_name="Article")
    created = models.DateTimeField(editable=False, null=True)
    updated = models.DateTimeField(null=True)
    rating = models.FloatField(default=0.0)
    author = models.ForeignKey(User, default=1, verbose_name="Author")  # 1-admin
    slug = models.SlugField(default="", blank=True, max_length=60)
    approved =  models.BooleanField(default=False)


    def getAllComments(self):
        return self.comment_set.all().order_by('-id')

    def getPopularComments(self, quantity=10):
        comments = self.comment_set.all()
        if comments.count() < quantity:
            return comments.order_by('like')  ##
        return comments[1: quantity]

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Articles'



class Comment(models.Model):
    author = models.ForeignKey(User)
    article = models.ForeignKey(Article)
    comment = models.TextField(max_length=2500, blank=False)
    created = models.DateTimeField(editable=False, null=True)
    updated = models.DateTimeField(null=True)
    likes = models.IntegerField(default=0)  # aka like

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(Comment, self).save(*args, **kwargs)

    @property
    def countLikes(self):
        return self.like_set.all().count()

    class Meta:
        verbose_name_plural = 'Comments'

    def __str__(self):
        if self.comment.__len__() < 60:
            return self.comment
        else:
            return self.comment[1:60]



class ArticleForm(ModelForm):
    class Meta:
        model = Article
        exclude = ['rating', 'author', 'slug', 'created', 'updated','approved','id']


class CommentForm(ModelForm):
    class Meta:
        model = Comment
        exclude = ['author', 'article', 'created', 'likes', 'updated']


class Like(models.Model):
    user = models.ForeignKey(User)
    comment = models.ForeignKey(Comment)
    created = models.DateTimeField(auto_now_add=True)


class Rate(models.Model):
    user = models.ForeignKey(User)
    article = models.ForeignKey(Article)
    created = models.DateTimeField(auto_now_add=True)
