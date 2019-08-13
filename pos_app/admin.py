from django.contrib import admin
from .models import Transaction, User, Product, Ingredient

admin.site.register([User, Transaction, Product, Ingredient])