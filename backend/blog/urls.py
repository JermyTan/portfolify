from django.urls import path
from .views import PostList, PostDetail

urlpatterns = [
    path("posts/", PostList.as_view(), name="blog-posts"),
    path("posts/<int:id>/", PostDetail.as_view(), name="blog-post-detail")
]
