from django.urls import path
from . import views


### MAIN's
urlpatterns = [
    path("", views.welcome, name="site"),
    path("base/", views.index, name="Welcome Shihan!"),
    path("index/", views.index, name="Welcome Shihan!"),
    path("home/", views.home, name="Welcome HOME"),
    path("dojo/", views.dojo, name="Welcome to the DOJO"),
]