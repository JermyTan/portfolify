from .models import Post
from .serializers import (
    CreatePostSerializer,
    ModifyPostSerializer,
    ViewPostSerializer,
    DeleteSerializer
)
from rest_framework.views import APIView
from rest_framework import status
from portfolify.common.api_responses import (
    create_ok_response,
    create_bad_request_response,
    create_custom_positive_response,
    create_custom_negative_response,
)

# Create your views here.


class PostList(APIView):
    """
    CRUD for Post list.
    """

    def get(self, request):
        posts = Post.objects.all()
        serializer = ViewPostSerializer(posts, many=True)

        return create_ok_response(serializer.data)

    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)

        if not serializer.is_valid():
            return create_bad_request_response(data=serializer.errors)

        title = serializer.validated_data.get("title")
        content = serializer.validated_data.get("content")
        image_data = serializer.validated_data.get("image_data")

        new_post = Post.objects.create_post(
            title=title, content=content, image_data=image_data)

        return create_custom_positive_response(
            data=ViewPostSerializer(new_post).data,
            response_status=status.HTTP_201_CREATED
        )

    def put(self, request):
        serializer = ModifyPostSerializer(data=request.data)

        if not serializer.is_valid():
            return create_bad_request_response(data=serializer.errors)

        id = serializer.validated_data.get("id")
        title = serializer.validated_data.get("title")
        content = serializer.validated_data.get("content")
        image_data = serializer.validated_data.get("image_data")

        modified_post = Post.objects.modify_post(
            id=id,
            title=title,
            content=content,
            image_data=image_data
        )

        return create_ok_response(
            data=ViewPostSerializer(modified_post).data
        )

    def delete(self, request):
        serializer = DeleteSerializer(data=request.data)

        if not serializer.is_valid():
            return create_bad_request_response(data=serializer.errors)

        ids = serializer.validated_data.get("ids")

        Post.objects.delete_posts(*ids)

        return create_ok_response()


class PostDetail(APIView):
    def get(self, request, id):
        post = Post.objects.get_post(id)

        if post is None:
            return create_custom_negative_response(
                data={"id": [f"id {id} does not exist"]},
                response_status=status.HTTP_404_NOT_FOUND
            )

        serializer = ViewPostSerializer(post)

        return create_ok_response(serializer.data)
