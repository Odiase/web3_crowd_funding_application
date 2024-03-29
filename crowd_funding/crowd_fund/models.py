# third packages imports
from django.db import models
from django.contrib.auth.models import User
from django_resized import ResizedImageField

# Create your models here.
class CrowdFund(models.Model):
    '''Crowd Funding Table Schema'''

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="crowd_funds")
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    image = ResizedImageField(size=[600,600], upload_to="uploads/recipe_images", force_format="jpeg", quality=100)

    def __str__(self):
        return self.name + " CrowdFund."