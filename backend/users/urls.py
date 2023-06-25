from django.urls import path
from .views import RegisterView, RetreiveUserView, AddMapView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetreiveUserView.as_view()),
    path('add', AddMapView.as_view())
]
