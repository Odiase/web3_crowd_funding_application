# third party packages imports
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required

#local imports
from .models import CrowdFund

# Create your views here.

@login_required(login_url="sign_in")
def create_crowd_fund(request):
    if request.method == "POST":
        owner = request.user
        crowd_fund_name = request.POST['fund_name']
        image = request.FILES['image']

        crowd_fund = CrowdFund.objects.create(owner=owner, name=crowd_fund_name, image=image)
        return redirect('single_crowd_fund', crowd_fund_name)

    return render(request, "create_crowd_funding.html")

@login_required(login_url="sign_in")
def single_crowd_fund(request, name):
    crowd_fund = CrowdFund.objects.get(name=name)
    crowd_fund_image = crowd_fund.image
    crowd_fund_owner= crowd_fund.owner.username
    date_created = crowd_fund.created
    
    image = ""
    owner = ""
    created = ""

    if crowd_fund_image:
        image = crowd_fund_image
    if crowd_fund_owner:
        owner = crowd_fund_owner
    if date_created:
        created = date_created


    context = {
        "name" : name, 
        "image" : image,
        "owner" : owner,
        "date" : created
    }
    return render(request, "single_crowd_fund.html", context)