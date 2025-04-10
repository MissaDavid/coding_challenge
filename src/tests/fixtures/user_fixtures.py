import pytest

from django.contrib.auth import get_user_model


@pytest.fixture
def poppy():
    User = get_user_model()
    return User.objects.create_user(
        username="poppyli",
        email="poppy@mythicquest.com",
        password="ilovecandies"
    )

@pytest.fixture
def dana():
    User = get_user_model()
    return User.objects.create_user(
        username="danabryant",
        email="dana@mythicquest.com",
        password="wildd"
    )

@pytest.fixture
def test_new_user():
    User = get_user_model()
    new_user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpassword123'
    )
    return new_user
