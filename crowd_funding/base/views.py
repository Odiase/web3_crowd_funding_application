# third packages imports
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login


# Create your views here.
def home(request):
    return render(request,"index.html")


def sign_in(request):
    return render(request, "login.html")


def sign_up(request):
    return render(request, "sign_up.html")


def sign_out(request):
    logout(request)
    return redirect("home")
