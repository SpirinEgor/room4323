from django.http import HttpResponse
from JsonDictConvertation import *

def loginRequiredJson(func):
    def wrap(request, *args, **kwargs):
        if not request.user.is_authenticated():
            return HttpResponse(
                convertFromDictToJson({'code': '', 'message': 'login_required'}), content_type='application/json')
        return func(request, *args, **kwargs)

    wrap.__doc__ = func.__doc__
    wrap.__name__ = func.__name__
    return wrap


# decorator
def staffMemberRequiredJson(func):
    def wrap(request, *args, **kwargs):
        user = request.user
        if not (user.is_authenticated() and user.is_staff):
            return HttpResponse(
                convertFromDictToJson({'code': '', 'message': 'no_permission'}), content_type='application/json')
        return func(request, *args, **kwargs)

    wrap.__doc__ = func.__doc__
    wrap.__name__ = func.__name__
    return wrap


def requiredJsonAndPost(func):

    def wrap(request, *args, **kwargs):
        if request.content_type != 'application/json':
            return HttpResponse(convertFromDictToJson({'code': '', 'message': 'Wrong content_type'}),
                                content_type='application/json')
        if request.method != "POST":
            return HttpResponse(convertFromDictToJson({'code': '', 'message': 'Wrong request.method'}),
                                content_type='application/json')
        return func(request, *args, **kwargs)

    wrap.__doc__ = func.__doc__
    wrap.__name__ = func.__name__
    return wrap
