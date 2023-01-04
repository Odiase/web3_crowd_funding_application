from django.urls import path
from .views import create_crowd_fund, single_crowd_fund

urlpatterns = [
    path("create", create_crowd_fund, name="create_crowd_fund"),
    path("<str:name>", single_crowd_fund, name="single_crowd_fund"),
]
