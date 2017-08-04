from django.db import models

# Create your models here.

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginForm(forms.Form):
    username = forms.CharField(label='Username', max_length=40, required=True, min_length=4)  ##??
    password = forms.CharField(label='Password', widget=forms.PasswordInput(), required=True, min_length=8)

    def save(self):
        user = authenticate(**self.cleaned_data)
        return user


class SignUpForm(forms.Form):
    first_name = forms.CharField(label='First name', max_length=40, required=False)
    last_name = forms.CharField(label='Last name', max_length=40, required=False)
    username = forms.CharField(label='Username', max_length=40, required=True, min_length=3)  ##??
    email = forms.EmailField(required=True)
    password = forms.CharField(label='Password', widget=forms.PasswordInput(), required=True, min_length=8)

    def save(self):
        user = User.objects.create_user(**self.cleaned_data)
        user.is_active = False  # for confirmation email
        user.save()
        return user

    def clean(self):
        cleaned_data = super(SignUpForm, self).clean()
        password = cleaned_data.get('password')
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')
        digit = False
        letter = False
        for char in password:
            if str(char).isalpha():
                letter = True
            if str(char).isdigit():
                digit = True
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('This username already exist!')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('This email adress already registered!')
        if not letter:
            raise forms.ValidationError("Need at least one letter")
        if not digit:
            raise forms.ValidationError("Need at least one digit")
        return cleaned_data
