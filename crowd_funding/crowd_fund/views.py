# third party packages imports
from django.shortcuts import render
from web3 import Web3

#local imports
from .models import CrowdFund

# Create your views here.

def create_crowd_fund(request):
    if request.method == "POST":
        owner = request.user
        crowd_fund_name = request.POST['fund_name']
        try:
            image = request.FILES['image']
            crowd_fund = CrowdFund.objects.create(owner=owner, name=crowd_fund_name, image=image)
            print(crowd_fund)
            crowd_fund.save()
        except:
            print("There Was An Exception")
            pass

    return render(request, "create_crowd_funding.html")


def single_crowd_fund(request, name):
    pass