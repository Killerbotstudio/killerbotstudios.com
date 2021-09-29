from django.urls import path
# from django.urls.resolvers import path
from . import views


#### TATAMI's
urlpatterns = [
    path('hello/', views.say_hello)
]