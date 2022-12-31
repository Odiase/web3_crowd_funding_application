from django.urls import path
from .views import home, sign_in, sign_up, sign_out, connect_wallet

urlpatterns = [
    path("", home, name="home"),
    path("sign_in", sign_in, name="sign_in"),
    path("sign_up", sign_up, name="sign_up"),
    path("sign_out", sign_out, name="sign_out"),
    path("connect_wallet", connect_wallet, name="connect_wallet"),
]
