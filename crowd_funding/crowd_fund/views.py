from django.shortcuts import render

# Create your views here.

def create_crowd_fund(request):
    if request.method == "POST":
        owner = request.user
    return render(request, "create_crowd_funding.html")