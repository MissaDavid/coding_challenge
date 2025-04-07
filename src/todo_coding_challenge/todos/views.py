from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.viewsets import ModelViewSet
from .models import TodoItem
from .serializers import TodoItemSerializer


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an item to access it.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the requesting user is the owner of the object
        return obj.owner == request.user


class TodoItemViewSet(ModelViewSet):
    """
    This view set auto-magically provides all `crud` actions.
    """
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        """
        This view should return a list of all the todo items
        for the currently authenticated owner of the items.
        """
        return TodoItem.objects.filter(owner=self.request.user)