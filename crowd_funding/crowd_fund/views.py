# third party packages imports
from django.shortcuts import render

#local imports
from .models import CrowdFund

# Create your views here.

def create_crowd_fund(request):
    if request.method == "POST":
        owner = request.user
        crowd_fund_name = request.POST['fund_name']
        image = request.FILES['image']

        crowd_fund = CrowdFund.objects.create(owner=owner, name=crowd_fund_name, image=image)

    return render(request, "create_crowd_funding.html")


def single_crowd_fund(request, name):
    context = {
        "name" : name
    }
    return render(request, "single_crowd_fund.html", context)