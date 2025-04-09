from django.db import models


class TodoItem(models.Model):
    owner = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.title