from django.test import TestCase
from blog.models import Post, Image
from django.db.utils import DataError, IntegrityError
import time

test_title = "Unit test title"
test_content = "Unit test content"


def create_post(title=test_title, content=test_content):
    return Post.objects.create(title=title, content=content)


class PostModelTests(TestCase):

    def test_create_post(self):
        post = create_post()

        # test post instance
        self.assertIsInstance(post, Post)
        self.assertEqual(post.title, test_title)
        self.assertEqual(post.content, test_content)
        self.assertTrue(hasattr(post, "created_at"))
        self.assertIsInstance(post.created_at, float)

    def test_create_post_with_emoji(self):
        test_title = "Unit test 😊😂🔥"
        test_content = "🥱😈😑"

        post = create_post(title=test_title, content=test_content)

        # test post instance
        self.assertEqual(post.title, test_title)
        self.assertEqual(post.content, test_content)

    def test_create_post_with_exceeded_title_length_limit(self):
        invalid_test_title = "t" * 101

        self.assertRaises(DataError, create_post, title=invalid_test_title)

    def test_update_post(self):
        post = create_post()

        new_test_title = "New unit test title"
        new_test_content = "New unit test content"

        Post.objects.filter(id=post.id).update(
            title=new_test_title, content=new_test_content)

        post.refresh_from_db()

        # test refreshed post instance
        self.assertEqual(post.title, new_test_title)
        self.assertEqual(post.content, new_test_content)

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
    test_url = "http://example.com/"
    test_image_id = "test id"

    def create_image(self, post, thumbnail_url=test_url, image_url=test_url, image_id=test_image_id):
        return Image.objects.create(post=post, thumbnail_url=thumbnail_url, image_url=image_url, image_id=image_id)

    def test_create_image(self):
        post = create_post()
        image = self.create_image(post=post)

        # test image instance
        self.assertIsInstance(image, Image)
        self.assertEqual(image.post, post)
        self.assertEqual(image.thumbnail_url, self.test_url)
        self.assertEqual(image.image_url, self.test_url)
        self.assertEqual(image.image_id, self.test_image_id)

    def test_create_image_with_exceeded_image_id_length_limit(self):
        invalid_test_image_id = "t" * 51
        post = create_post()

        self.assertRaises(DataError, self.create_image,
                          post=post, image_id=invalid_test_image_id)

    def test_create_image_without_post(self):
        self.assertRaises(IntegrityError, Image.objects.create)

    def test_update_image(self):
        post = create_post()
        image = self.create_image(post=post)

        new_post = create_post(title="New post title",
                               content="New post content")
        new_test_url = "https://google.com"
        new_test_image_id = "new test id"

        image.post = new_post
        image.thumbnail_url = new_test_url
        image.image_url = new_test_url
        image.image_id = new_test_image_id
        image.save()

        self.assertEqual(image.post, new_post)
        self.assertEqual(image.thumbnail_url, new_test_url)
        self.assertEqual(image.image_url, new_test_url)
        self.assertEqual(image.image_id, new_test_image_id)

        sameImage = Image.objects.get(post=new_post)
        self.assertEqual(sameImage, image)

    def test_remove_post_from_image(self):
        post = create_post()
        image = self.create_image(post=post)

        image.post = None
        self.assertRaises(IntegrityError, image.save)
