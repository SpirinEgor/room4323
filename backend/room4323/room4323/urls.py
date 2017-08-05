"""room4323 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from authentification.views import activate, loginUser, \
    signupUser, logoutUser  # ,send
from django.conf.urls import url
from django.contrib import admin
from articles.views import  *

urlpatterns = [
    # url(r'^send$', send),
    url(r'^admin/', admin.site.urls),
    url(r'^api/authentification/auth$', loginUser, name='login'),
    url(r'^api/authentification/logout/$', logoutUser, name='logout'),
    url(r'^api/authentification/signup/$', signupUser, name='signup'),
    url(r'^api/authentification/activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        activate,
        name='activate'),

    url(r'^api/article/create/$', createArticle, name='createArticle'),
    url(r'^api/article/(?P<slug>[-\w\d]+)/$', getArticle, name='getArticle'),
    url(r'^api/article/(?P<slug>[-\w\d]+)/edit/$', editArticle, name='editArticle'),
    url(r'^api/article/(?P<slug>[-\w\d]+)/delete/$', deleteArticle, name='deleteArticle'),
    url(r'^api/article/(?P<slug>[-\w\d]+)/rate/(?P<score>[12345]{1})$', rateArticle, name='rateArticle'),
    url(r'^api/article/[-\w\d]+/(?P<comment_id>[0-9]+)/like$', likeComment, name='likeComment'),
    url(r'^api/article/[-\w\d]+/(?P<comment_id>[0-9]+)/edit$', editComment, name='editComment'),
    url(r'^api/article/[-\w\d]+/(?P<comment_id>[0-9]+)/delete$', deleteComment, name='deleteComment'),

    url(r'^api/moderation/(?P<slug>[-\w\d]+)/$', approveArticle, name='approveArticle'),
    url(r'^api/moderation/all/$', getArticlesOnModeration, name='getArticlesOnModeration')

]
