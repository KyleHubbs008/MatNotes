from rest_framework import generics
from .models import JournalEntry
from .serializers import JournalEntrySerializer

class JournalEntryListCreate(generics.ListCreateAPIView):
    serializer_class = JournalEntrySerializer

    def get_queryset(self):
        date = self.request.query_params.get('date')
        if date:
            return JournalEntry.objects.filter(date=date)
        return JournalEntry.objects.all()