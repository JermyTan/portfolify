from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status

from blog.views import PostList, PostDetail
from blog.models import Post

test_title = "Unit test title"
test_content = "Unit test content"
new_test_title = "New unit test title"
new_test_content = "New unit test content"


class PostListAPITests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PostList.as_view()
        self.url = reverse("blog-posts")

    def test_get_posts_success(self):
        request = self.factory.get(self.url)

        # no posts
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )
        self.assertEqual(response.data["data"], [])

        # add post
        Post.objects.create(title=test_title, content=test_content)
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )
        # verify returned data
        self.assertEqual(len(response.data["data"]), 1)
        returned_post = response.data["data"][0]
        self.assertEqual(returned_post["title"], test_title)
        self.assertEqual(returned_post["content"], test_content)

    def test_create_post_success(self):
        request = self.factory.post(
            self.url,
            {"title": test_title, "content": test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected response code {status.HTTP_201_CREATED}, received {response.status_code} instead."
        )
        # verify returned data
        returned_post = response.data["data"]
        self.assertEqual(returned_post["title"], test_title)
        self.assertEqual(returned_post["content"], test_content)

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_create_post_missing_fields_failure(self):
        # test missing title
        request = self.factory.post(
            self.url,
            {"content": test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # test missing content
        request = self.factory.post(
            self.url,
            {"title": test_title},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 0)

    def test_create_post_empty_fields_failure(self):
        # test empty title
        request = self.factory.post(
            self.url,
            {"title": "", "content": test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # test empty content
        request = self.factory.post(
            self.url,
            {"title": test_title, "content": ""},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 0)

    def test_create_post_only_whitespaces_failure(self):
        # test title with only whitespaces
        request = self.factory.post(
            self.url,
            {"title": "    ", "content": test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # test content with only whitespaces
        request = self.factory.post(
            self.url,
            {"title": test_title, "content": "    "},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 0)

    def test_update_post_success(self):
        post = Post.objects.create(title=test_title, content=test_content)

        request = self.factory.put(
            self.url,
            {"id": post.id, "title": new_test_title,
                "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )
        # verify returned data
        returned_post = response.data["data"]
        self.assertEqual(returned_post["title"], new_test_title)
        self.assertEqual(returned_post["content"], new_test_content)

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, new_test_title)
        self.assertEqual(Post.objects.get().content, new_test_content)

    def test_update_post_missing_fields_failure(self):
        post = Post.objects.create(title=test_title, content=test_content)

        # missing id
        request = self.factory.put(
            self.url,
            {"title": new_test_title, "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # missing title
        request = self.factory.put(
            self.url,
            {"id": post.id, "title": new_test_title},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # missing content
        request = self.factory.put(
            self.url,
            {"id": post.id, "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_update_post_empty_fields_failure(self):
        post = Post.objects.create(title=test_title, content=test_content)

        # empty title
        request = self.factory.put(
            self.url,
            {"id": post.id, "title": "", "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # empty content
        request = self.factory.put(
            self.url,
            {"id": post.id, "title": new_test_title, "content": ""},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_update_post_only_whitespaces_failure(self):
        post = Post.objects.create(title=test_title, content=test_content)

        # test title with only whitespaces
        request = self.factory.put(
            self.url,
            {"id": post.id, "title": "   ", "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # test content with only whitespaces
        request = self.factory.put(
            self.url,
            {"id": post.id, "title": new_test_title, "content": "   "},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_update_post_wrong_id_failure(self):
        post = Post.objects.create(title=test_title, content=test_content)

        # non-existing id
        request = self.factory.put(
            self.url,
            {"id": post.id + 1, "title": new_test_title,
                "content": new_test_content},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_delete_posts_success(self):
        posts = [Post.objects.create(
            title=test_title, content=test_content) for _ in range(4)]

        # delete zero posts
        request = self.factory.delete(
            self.url,
            {"ids": []},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 4)

        # delete single post
        post = posts.pop()

        request = self.factory.delete(
            self.url,
            {"ids": [post.id]},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 3)

        # delete multiple posts
        request = self.factory.delete(
            self.url,
            {"ids": list(map(lambda post: post.id, posts))},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 0)

    def test_delete_posts_wrong_id_failure(self):
        # only non-existing id
        post1 = Post.objects.create(title=test_title, content=test_content)
        request = self.factory.delete(
            self.url,
            {"ids": [post1.id + 1]},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 1)

        # mixture of existing id and non-existing id
        post2 = Post.objects.create(title=test_title, content=test_content)
        request = self.factory.delete(
            self.url,
            {"ids": [post1.id, post2.id, post1.id + post2.id]},
            format="json"
        )
        response = self.view(request)

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected response code {status.HTTP_400_BAD_REQUEST}, received {response.status_code} instead."
        )

        # verify db
        self.assertEqual(Post.objects.count(), 2)


class PostDetailAPITests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PostDetail.as_view()
        self.url = lambda id: reverse("blog-post-detail", kwargs={"id": id})

    def test_get_single_post_success(self):
        post = Post.objects.create(title=test_title, content=test_content)

        request = self.factory.get(self.url(post.id))
        response = self.view(request, post.id)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected response code {status.HTTP_200_OK}, received {response.status_code} instead."
        )
        # verify returned data
        returned_post = response.data["data"]
        self.assertEqual(returned_post["title"], test_title)
        self.assertEqual(returned_post["content"], test_content)

        # verify db
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, test_title)
        self.assertEqual(Post.objects.get().content, test_content)

    def test_get_single_post_wrong_id_failure(self):
        post = Post.objects.create(title=test_title, content=test_content)

        # non-existing id
        request = self.factory.get(self.url(post.id + 1))
        response = self.view(request, post.id + 1)

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
            f"Expected response code {status.HTTP_404_NOT_FOUND}, received {response.status_code} instead."
        )
