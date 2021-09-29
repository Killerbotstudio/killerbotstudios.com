from django.shortcuts import render
from django.http import HttpResponse
from .models import FeaturesList as feat, Item
# Create your views here.


### MAIN's
def home (response):
    # return HttpResponse("<h1>...将軍...<h2>\n<h5>welcome</h5>")
    # return render(response, "main/demo_main.html", {"head_title":"information panel"})
    return render(response, "main/demos/demo_main.html")
def index (response):
    ls = feat.objects.get()
    # return HttpResponse("<h1>...将軍...<h2>\n<h5>welcome</h5>")
    return render(response, "main/base.html", {"message":"this is home2"})
# def indexlist (response, id):
#     ls = feat.objects.get(id=id)
#     return HttpResponse("<h1>...将軍...<h2>\n<h5>%s</h5>" %ls.name)    

# def namelist (response, name):
#     ls = feat.objects.get(name=name) # pass string type in list
#     item = ls.item_set.all(id = 1)
#     return HttpResponse("<h1>...将軍...<h2>\n<h5>%s</h5><br></br>" %(ls.name, str(item.text)))
    
def welcome (response):
    # string = "<h2>こんにちは!</h2> \n <h5>this is a welcoming message</h5"
    # return render(response, "main/demo_main.html", {"message":"こんにちは!"})
    return render(response, "main/demos/demo_main.html")
    # return HttpResponse(string)    

def dojo (response):
    return HttpResponse("<h1>¡¡¡道場!!!</h1>")