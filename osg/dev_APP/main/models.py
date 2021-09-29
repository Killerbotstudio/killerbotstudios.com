from django.db import models

# Create your models here.
class FeaturesList(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Item(models.Model):
    featureList = models.ForeignKey(FeaturesList, on_delete=models.CASCADE)
    text = models.CharField(max_length=50)
    complete = models.BooleanField()

    def __str__(self):
        return self.text



# from main.models import Item, FeaturesList
# >>> t = FeaturesList(name="Basic")
# >>> t.save()
# >>> FeaturesList.objects.all()
# <QuerySet [<FeaturesList: Basic>]>
# >>> LIST.objects.get(id=1).
# >>> t.item_set.create(text="ladders", complete = False)
