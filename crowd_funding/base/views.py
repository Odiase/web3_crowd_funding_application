# third packages imports
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from django.contrib import messages
from django.contrib.auth.models import User
# from django.contrib.auth.decorators import login_required

# local imports
# from .forms import UserForm


# Create your views here.
def home(request):
    return render(request,"index.html")


def sign_in(request):
    #checking if user is already logged in
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.info("Invalid credentials!")
            return redirect("sign_in")
    return render(request, "login.html")


def sign_up(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password1']
        password2 = request.POST['password2']
        email = request.POST['email']

        if password != password2:
            messages.error(request, "Your Passwords Don't Match.")
            return redirect('sign_up')
        if len(password) < 6:
            messages.error(request, "Password Is Too Short.")
            return redirect('sign_up')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, "This User already Exists")
            return redirect('sign_up')
        
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        messages.success(request, "Successfully Registered")
        return redirect('sign_in')
    return render(request, "sign_up.html")


def sign_out(request):
    logout(request)
    return redirect("home")
