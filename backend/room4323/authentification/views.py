from JsonDictConvertation import *
from authentification.models import *
from decorators import json_and_post_required
from django.contrib.auth import logout, login
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import _urlparse as urlparse, urlsafe_base64_decode, urlsafe_base64_encode

from authentification.tokens import *

# NOTE MAKE domain const
domain = '127.0.0.1:8000'


# registration

def loginUser(request):
    form = LoginForm({'username': request.GET.get('login', None), 'password': request.GET.get('password', None)})
    if form.is_valid():
        user = form.save()
        if user is not None:
            print("dddddddddddddd")
            login(request, user)
            return HttpResponse(convertFromDictToJson({'code': '', 'message': 'success'}),
                                content_type='application/json')
    return HttpResponse(convertFromDictToJson({'code': '', 'message': 'failed'}), content_type='application/json')


from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@json_and_post_required
def signupUser(request):
    form = SignUpForm(convertFromJsonToDict(request))
    errors = form.errors.as_json()
    if form.is_valid():
        user = form.save()
        subject = 'Activate Your Account'
        message = render_to_string('accountActivationeEmail.html', {
            'user': user,
            'domain': domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': accountActivationToken.make_token(user),
        })
        user.email_user(subject, message)  # for  production need registered  domain and email service. f
        # or debug in settings.py EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
        return HttpResponse(convertFromDictToJson({'code': "", 'message': 'Activate Your Account'}),
                            content_type='application/json')
    return HttpResponse(errors, content_type='application/json')


def logoutUser(request):
    logout(request)
    return HttpResponse(convertFromDictToJson({'code': '', 'message': 'success'}), content_type='application/json')


def isSafeUrl(url):
    result = urlparse(url)
    if result.netloc is None or result.netloc == '' or not str(result.netloc) == str(domain):
        return False
    return True


# email confirmation
def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and accountActivationToken.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return HttpResponse(convertFromDictToJson({'code': "", 'message': 'Account activated'}),
                            content_type='application/json')
    else:
        return HttpResponse(convertFromDictToJson({'code': "", 'message': 'Invalid account or link'}),
                            content_type='application/json')

# import  requests
# def send(request):
#    response = requests.post('http://127.0.0.1:8000/api/authentification/signup/',
#                             json={"key": "value", 'password': 'sdjgdsg4534','username':'dfjsdkkjflas3','email':'shdnmgidsjhg@mail.ru' })
#    return HttpResponse(convertFromDictToJson({'code': '', 'message': 'success'}), content_type='application/json')
#
#
