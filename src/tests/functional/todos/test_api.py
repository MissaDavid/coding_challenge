import pytest
from datetime import timedelta
from django.urls import reverse
from django.utils import timezone
from rest_framework import status


@pytest.mark.django_db
class TestTodoAPI:
    def test_create_todo(self, api_client, poppy):
        """Test creating a new todo item"""
        api_client.force_authenticate(user=poppy)

        tomorrow = timezone.now() + timedelta(days=1)

        new_todo_data = {
            "title": "Finish DLC",
            "description": "Ubisoft deadline for the latest expansion",
            "owner": poppy.id,
            "is_completed": False,
            "due_date": tomorrow
        }
        # When you register a viewset with a router, DRF automatically creates named URL patterns
        # i.e., "{basename}-list"
        url = reverse("todos-list")
        response = api_client.post(url, new_todo_data, format="json")

        # Assert response
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["title"] == new_todo_data.get("title")
        assert response.data["owner"] == poppy.id

        from todo_coding_challenge.todos.models import TodoItem
        new_todo = TodoItem.objects.get(title="Finish DLC")
        assert new_todo.owner == poppy

    def test_cannot_access_others_todos(self, api_client, dana, todo_items):
        """Test that a user cannot access another user's todos"""
        api_client.force_authenticate(user=dana)

        url = reverse("todos-detail", kwargs={"pk": todo_items[0].pk})
        response = api_client.get(url)

        assert response.status_code == status.HTTP_404_NOT_FOUND