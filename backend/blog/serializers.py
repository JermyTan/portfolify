from rest_framework import serializers
from .models import Post


def id_exists(id):
    if not Post.objects.filter(id=id).exists():
        raise serializers.ValidationError(f"id {id} does not exist")


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["title", "content", "image_uri"]

    # exclude data:image/png;base64, prefix
    image_uri = serializers.RegexField(r'([^\"]*)', required=False)


class ModifyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "content", "image_uri"]

    id = serializers.IntegerField(validators=[id_exists])
    image_uri = serializers.RegexField(r'([^\"]*)', required=False)

    ## image_uri = serializers.RegexField(r'data:image\/(?:jpg|gif|png|jpeg);base64,([^\"]*)', required=False)


class DeleteSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.IntegerField(validators=[id_exists]), allow_empty=False)


class ViewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "created_at", "title", "image", "content"]
        depth = 1
