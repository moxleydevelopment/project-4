from django.urls import path, include
from . import views
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('transactions', views.TransactionView)
router.register('products', views.ProductView)
router.register('ingredients', views.IngredientView)

urlpatterns = [
    path('', include(router.urls))
]
