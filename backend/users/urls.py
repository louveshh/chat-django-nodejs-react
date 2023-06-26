from django.urls import path
from .views import RegisterView, RetreiveUserView, AddMapView, MapView, RemoveMapView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetreiveUserView.as_view()),
    path('add', AddMapView.as_view()),
    path('map', MapView.as_view()),
    path('remove', RemoveMapView.as_view())
]
