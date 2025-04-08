import pytest
from django.urls import reverse


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def urls():
    return {
        'login': reverse('token_obtain_pair'),
        'refresh': reverse('token_refresh'),
        'user_details': reverse('user_details'),
        'register': reverse('register')
    }