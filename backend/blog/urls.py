from django.urls import path
from .views import PostList, PostDetail

urlpatterns = [
    path("", PostList.as_view(), name="blog-posts"),
    path("<int:id>/", PostDetail.as_view(), name="blog-post-detail")
]
