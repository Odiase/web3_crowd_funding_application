from django.urls import path
from .views import create_crowd_fund

urlpatterns = [
    path("create", create_crowd_fund, name="create_crowd_fund"),
]
