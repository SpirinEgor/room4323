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
from django.conf.urls import url
from django.contrib import admin

from  backend.articles.views import *
from backend.authentification.views import login_user, logout_user, signup, activate, accountActivationSent

#on process .right know for a testing
def home(request):
    render(request, 'accountActivationSent.html')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/', login_user, name='login'),
    url(r'^logout/', logout_user, name='logout'),
    url(r'^signup/', signup, name='signup'),
    url(r'^$', signup, name='home'),
    url(r'^article/create/$', home, name='createArticle'),
    url(r'^article/(?P<slug>[-\w\d]+)/$', login_user, name='ShowArticle'),
    url(r'^article/(?P<slug>[-\w\d]+)/edit/$', login_user, name='editArticle'),
    url(r'^article/(?P<slug>[-\w\d]+)/delete/$', logout_user, name='deleteArticle'),
    url(r'^article/(?P<slug>[-\w\d]+)/rate/(?P<score>[12345]{1})$', logout_user, name='rateArticle'),
    url(r'^article/[-\w\d]+/(?P<comment_id>[0-9]+)/like$', logout_user, name='likeComment'),
    url(r'^article/[-\w\d]+/(?P<comment_id>[0-9]+)/edit$', logout_user, name='editComment'),
    url(r'^article/[-\w\d]+/(?P<comment_id>[0-9]+)/delete$', logout_user, name='deleteComment'),
    url(r'^accountActivationSent/$', accountActivationSent, name='accountActivationSent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        activate, name='activate')

]
