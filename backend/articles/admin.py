from django.contrib import admin

from  articles.models import *

# Register your models here.


admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Rate)
