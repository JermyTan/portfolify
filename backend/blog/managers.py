from django.db import models
from django.apps import apps
from imagekitio import ImageKit
import os

imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
    public_key=os.getenv("IMAGEKIT_PUBLIC_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL")
)


class PostManager(models.Manager):
    def get_post(self, id):
        try:
            return self.get(id=id)
        except self.model.DoesNotExist:
            return None
        
    def create_post(self, title, content, image_uri=None):
        new_post = self.create(title=title, content=content)

        apps.get_model("blog", "Image").objects.create_image(
            post=new_post, image_uri=image_uri)

        return new_post

    def modify_post(self, id, title, content, image_uri=None):
        # attempt to delete images at remote storage
        apps.get_model("blog", "Image").objects.delete_images(id)

        current_post = self.get(id=id)
        current_post.title = title
        current_post.content = content
        current_post.save()

        apps.get_model("blog", "Image").objects.create_image(
            post=current_post, image_uri=image_uri)

        return current_post

    def delete_posts(self, *ids):
        # attempt to delete images at remote storage
        apps.get_model("blog", "Image").objects.delete_images(*ids)

        # delete posts
        self.filter(id__in=ids).delete()


class ImageManager(models.Manager):
    def create_image(self, post, image_uri):
        if not image_uri:
            return
        try:
            # refer to https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload
            data = imagekit.upload(
                file=image_uri,
                file_name="test.jpeg",
            ).get("response")

            thumbnail_url = data.get("thumbnailUrl")
            image_url = data.get("url")
            image_id = data.get("fileId")
            if not all((thumbnail_url, image_url, image_id)):
                return

        except:
            return

        new_image = self.create(
            post=post,
            thumbnail_url=thumbnail_url,
            image_url=image_url,
            image_id=image_id
        )

        return new_image

    def delete_images(self, *post_ids):
        to_delete_image_ids = [image.image_id for image in self.filter(
            post__in=post_ids)]

        if not to_delete_image_ids:
            return

        if len(to_delete_image_ids) == 1:
            # refer to https://docs.imagekit.io/api-reference/media-api/delete-file
            imagekit.delete_file(to_delete_image_ids[0])
        else:
            # refer to https://docs.imagekit.io/api-reference/media-api/delete-files-bulk
            imagekit.bulk_file_delete(to_delete_image_ids)

        self.filter(post__in=post_ids).delete()
