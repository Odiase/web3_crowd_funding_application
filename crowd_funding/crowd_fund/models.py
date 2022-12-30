# third packages imports
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CrowdFund(models.Model):
    '''Crowd Funding Table Schema'''

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="crowd_funds")
    name = models.CharField(max_length=100, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField()

    def __str__(self):
        return self.name + " CrowdFund."