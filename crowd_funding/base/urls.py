from django.urls import path
from .views import home, sign_in

urlpatterns = [
    path("", home, name="home"),
    path("sign_in", sign_in, name="sign_in"),
]