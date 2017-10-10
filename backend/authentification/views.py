from JsonDictConvertation import *
from authentification.models import *
from decorators import requiredJsonAndPost
from django.contrib.auth import logout, login
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import  urlsafe_base64_decode, urlsafe_base64_encode
from authentification.tokens import *
from django.views.decorators.csrf import csrf_exempt
import datetime
# NOTE MAKE domain const
domain = '127.0.0.1:8000'


# registration
@csrf_exempt
@requiredJsonAndPost
def loginUser(request):
    form = LoginForm(convertFromJsonToDict(request))
    if form.is_valid():
        user = form.save()
        if user is not None:
            login(request, user)
            response = HttpResponse(convertFromDictToJson({'status': 'OK', 'message': 'success'}),
                                        content_type='application/json')
            max_age = 365 * 24 * 60 * 60  #one year
            expires = datetime.datetime.strftime(datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age), "%a, %d-%b-%Y %H:%M:%S GMT")
            response.set_cookie('username', user.username, max_age=max_age, expires=expires, secure=False)
            return response
    return HttpResponse(convertFromDictToJson({'status': 'FAIL', 'message': 'failed'}), content_type='application/json')

@csrf_exempt
@requiredJsonAndPost
def signupUser(request):
    form = SignUpForm(convertFromJsonToDict(request))
    errors = form.errors.as_json()
    if form.is_valid():
        user = form.save()
        subject = 'Activate Your Account'
        # message = render_to_string('accountActivationeEmail.html', {
        #     'user': user,
        #     'domain': domain,
        #     'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        #     'token': accountActivationToken.make_token(user),
        # })
        # user.email_user(subject, message)  # for  production need registered  domain and email service. f
        # or debug in settings.py EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
        return HttpResponse(convertFromDictToJson({'status': "OK", 'message': 'Activate Your Account'}),
                            content_type='application/json')
    return HttpResponse(errors, content_type='application/json')


def logoutUser(request):
    logout(request)
    return HttpResponse(convertFromDictToJson({'status': 'ok', 'message': 'success'}), content_type='application/json')


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
