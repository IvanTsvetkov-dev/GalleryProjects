from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images', null=True, blank=True)
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-updated']