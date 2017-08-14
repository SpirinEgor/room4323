from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.template.defaultfilters import slugify


class ArticleManager(models.Manager):
    pass


class Category(models.Model):
    name = models.CharField(unique=True, max_length=40)

    class Meta:
        verbose_name_plural = 'Categories'


class Article(models.Model):
    objects = ArticleManager()
    title = models.CharField(max_length=90, unique=True, verbose_name='Title')
    text = models.TextField(verbose_name="Article")
    category = models.ForeignKey(Category)
    rating = models.FloatField(default=0.0)
    author = models.ForeignKey(User, default=1, verbose_name="Author")  # 1-admin
    approved = models.BooleanField(default=False)
    slug = models.SlugField(default="", blank=True, max_length=60)

    # cahgne slugify from - to _
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    def toDict(self):
        return dict(author=self.author.username, title=self.title, rating=self.rating,
                    text=self.text, category=self.category.name,id=self.id)

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
        fields = ('text', 'title')


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
