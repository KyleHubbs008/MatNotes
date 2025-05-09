from django.db import models

class JournalEntry(models.Model):
    date = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Entry for {self.date}: {self.content[:50]}"
