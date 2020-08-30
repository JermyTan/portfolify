from django.db import models
from .managers import PostManager, ImageManager

# Create your models here.


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    content = models.TextField()

    class Meta:
        ordering = ["-created"]

    objects = PostManager()


class Image(models.Model):
    post = models.OneToOneField(
        Post, on_delete=models.CASCADE, primary_key=True)
    thumbnail_url = models.URLField()
    image_url = models.URLField()
    image_id = models.CharField(max_length=50)

    objects = ImageManager()
