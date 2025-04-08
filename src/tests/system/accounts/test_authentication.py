import pytest
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()


@pytest.mark.django_db
def test_user_registration(api_client, urls):
    data = {
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'NewStrongPassword123!',
        'password2': 'NewStrongPassword123!'
    }

    response = api_client.post(urls['register'], data, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username='newuser').exists()

@pytest.mark.django_db
def test_user_login_and_token_obtain(api_client, test_new_user, urls):
    data = {
        'username': 'testuser',
        'password': 'testpassword123'
    }

    response = api_client.post(urls['login'], data, format='json')

    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data


def test_cannot_access_user_details_without_token(api_client, urls):
    response = api_client.get(urls['user_details'])

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
