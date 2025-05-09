from django.urls import path, include

urlpatterns = [
    path('journal/', include('journal.urls')),
]
