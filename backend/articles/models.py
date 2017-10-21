from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.template.defaultfilters import slugify
from django.utils import timezone
import datetime

class ArticleManager(models.Manager):
    def getAllArticlesTitle(self,approved):
        querySet = self.filter(approved=approved)
        dictionary = {}
        for category in Category.objects.all():
            val = list(querySet.filter(category=category).values_list('title', 'slug'))
            if val == []:
                continue
            dictionary[category.name] = val 
        return dictionary


class Category(models.Model):
    name = models.CharField(unique=True, max_length=40)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name.encode('utf-8')


class Article(models.Model):
    objects = ArticleManager()
    title = models.CharField(max_length=90, unique=True, verbose_name='Title')
    algorithm = models.TextField(verbose_name="algorithm")
    category = models.ForeignKey(Category)
    rating = models.FloatField(default=0.0)
    author = models.ForeignKey(User, default=1, verbose_name="Author")  # 1-admin
    approved = models.BooleanField(default=False)
    slug = models.SlugField(default="", blank=True, max_length=60)
    created = models.DateTimeField(editable=False,null=True)
    updated = models.DateTimeField(null=True)


    # cahgne slugify from - to _
    def save(self, *args, **kwargs):
        from unidecode import unidecode
        self.slug = slugify(unidecode(self.title))
        if not self.id:
             self.created = timezone.now()
        self.updated = timezone.now()
        super(Article, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.title.encode('utf-8')

    def toDict(self):
        return dict(author=self.author.username, title=self.title, rating=self.rating,
                    algorithm=self.algorithm, category=self.category.name, id=self.id,created=str(self.created.strftime('%d-%m-%y')))

    class Meta:
        verbose_name_plural = 'Articles'


class Comment(models.Model):
    comment = models.TextField(max_length=2500, blank=False)
    author = models.ForeignKey(User)
    article = models.ForeignKey(Article)
    likes = models.IntegerField(default=0)

    def toDict(self):
        return dict(author=self.author.username, likes=self.likes, comment=self.comment)

    class Meta:
        verbose_name_plural = 'Comments'


class ArticleForm(ModelForm):
    class Meta:
        model = Article
        fields = ('algorithm', 'title')


class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ('comment',)


class Like(models.Model):
    user = models.ForeignKey(User)
    comment = models.ForeignKey(Comment)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Likes'


class Rate(models.Model):
    user = models.ForeignKey(User)
    article = models.ForeignKey(Article)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Rates'
