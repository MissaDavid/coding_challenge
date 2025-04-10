from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet

router = DefaultRouter(trailing_slash=False)
router.register("todos", TodoItemViewSet, basename="todos")

urlpatterns = router.urls