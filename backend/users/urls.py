from django.urls import path
from .views import RegisterView, RetreiveUserView

urlpatterns = [
  path('register',RegisterView.as_view()),
   path('me', RetreiveUserView.as_view())
  
]