from django.contrib.auth.models import AbstractUser


"""
The official Django documentation highly recommends using a custom user model when starting a new project.
https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
"""
class User(AbstractUser):
    def __str__(self) -> str:
        return self.username
