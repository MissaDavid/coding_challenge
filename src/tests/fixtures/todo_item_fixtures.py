import pytest
from datetime import timedelta
from django.utils import timezone


@pytest.fixture
def todo_items(poppy, dana):
    tomorrow = timezone.now() + timedelta(days=1)

    items = [
        {
            "title": "Finish DLC",
            "description": "Ubisoft deadline for the latest expansion",
            "owner": poppy,
            "is_completed": False,
            "due_date": tomorrow,
        },
        {
            "title": "Fix all the bugs",
            "description": "I have to do everything here!",
            "owner": poppy,
            "is_completed": False,
            "due_date": tomorrow,
        },
        {
            "title": "Add feature to PlayPen",
            "description": "",
            "owner": dana,
            "is_completed": False,
            "due_date": tomorrow,
        },
    ]

    from todo_coding_challenge.todos.models import TodoItem
    return [TodoItem.objects.create(**item) for item in items]