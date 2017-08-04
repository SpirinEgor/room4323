from django.shortcuts import render, redirect
from django.contrib.auth import logout, login
from security.models import *
from django.utils.http import _urlparse as urlparse, urlsafe_base64_decode, urlsafe_base64_encode
from security.tokens import *
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site


# registration

def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            currentSite = get_current_site(request)
            subject = 'Activate Your Account'
            message = render_to_string('accountActivationeEmail.html', {
                'user': user,
                'domain': currentSite.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': accountActivationToken.make_token(user),
            })
            user.email_user(subject, message)  # for  production need registered  domain and email service. f
            # or debug in settings.py EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
            return redirect('accountActivationSent')
    else:
        form = SignUpForm()
    return render(request, "signup.html", {"form": form})


def login_user(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            user = form.save()
            if user is not None:  # None also if user.is_active == False
                login(request, user)
    form = LoginForm()
    return render(request, "login.html", {"form": form})


def logout_user(request):
    next = request.GET.get('next', None)
    logout(request)
    if not isSafeUrl(next):
        next = domain
    return redirect(next)


# NOTE MAKE domain const
domain = '127.0.0.1:8000'


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
        return redirect('home')
    else:
        return render(request, 'account_activation_invalid.html')


def accountActivationSent(request):
    return render(request, 'accountActivationSent.html')
