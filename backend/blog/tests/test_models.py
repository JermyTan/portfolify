from django.test import TestCase
from blog.models import Post, Image
from django.db.utils import DataError, IntegrityError
import time

title_test = "Unit test title"
content_test = "Unit test content"


def create_post(title=title_test, content=content_test):
    return Post.objects.create(title=title, content=content)


class PostModelTests(TestCase):

    def test_create_post(self):
        post = create_post()

        # test post instance
        self.assertIsInstance(post, Post)
        self.assertEqual(post.title, title_test)
        self.assertEqual(post.content, content_test)
        self.assertTrue(hasattr(post, "created_at"))
        self.assertIsInstance(post.created_at, float)

    def test_create_post_with_emoji(self):
        title_test = "Unit test 😊😂🔥"
        content_test = "🥱😈😑"

        post = create_post(title=title_test, content=content_test)

        # test post instance
        self.assertEqual(post.title, title_test)
        self.assertEqual(post.content, content_test)

    def test_create_post_with_exceeded_title_length_limit(self):
        invalid_title_test = "t" * 101

        self.assertRaises(DataError, create_post, title=invalid_title_test)

    def test_update_post(self):
        post = create_post()

        new_title_test = "New unit test title"
        new_content_test = "New unit test content"

        post.title = new_title_test
        post.content = new_content_test
        post.save()

        # test post instance
        self.assertEqual(post.title, new_title_test)
        self.assertEqual(post.content, new_content_test)

    def test_posts_ordering(self):
        posts = []
        for i in range(5):
            post = Post.objects.create(title=str(i), content=str(i))
            posts.append(post)

        # test posts sorted in descending order in created_at
        posts_from_db = list(Post.objects.all())
        self.assertNotEqual(posts_from_db, posts)

        posts.sort(key=lambda post: post.created_at, reverse=True)
        self.assertEqual(posts_from_db, posts)


class ImageModelTests(TestCase):
    url_test = "http://example.com/"
    image_id_test = "test id"

    def create_image(self, post, thumbnail_url=url_test, image_url=url_test, image_id=image_id_test):
        return Image.objects.create(post=post, thumbnail_url=thumbnail_url, image_url=image_url, image_id=image_id)

    def test_create_image(self):
        post = create_post()
        image = self.create_image(post=post)

        # test image instance
        self.assertIsInstance(image, Image)
        self.assertEqual(image.post, post)
        self.assertEqual(image.thumbnail_url, self.url_test)
        self.assertEqual(image.image_url, self.url_test)
        self.assertEqual(image.image_id, self.image_id_test)

    def test_create_image_with_exceeded_image_id_length_limit(self):
        invalid_image_id_test = "t" * 51
        post = create_post()

        self.assertRaises(DataError, self.create_image,
                          post=post, image_id=invalid_image_id_test)

    def test_create_image_without_post(self):
        self.assertRaises(IntegrityError, Image.objects.create)

    def test_update_image(self):
        post = create_post()
        image = self.create_image(post=post)

        new_post = create_post(title="New post title",
                               content="New post content")
        new_url_test = "https://google.com"
        new_image_id_test = "new test id"

        image.post = new_post
        image.thumbnail_url = new_url_test
        image.image_url = new_url_test
        image.image_id = new_image_id_test
        image.save()

        self.assertEqual(image.post, new_post)
        self.assertEqual(image.thumbnail_url, new_url_test)
        self.assertEqual(image.image_url, new_url_test)
        self.assertEqual(image.image_id, new_image_id_test)

    def test_remove_post_from_image(self):
        post = create_post()
        image = self.create_image(post=post)

        image.post = None
        self.assertRaises(IntegrityError, image.save)
