from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    passcode = models.CharField(max_length=6)
    transaction = models.ManyToManyField('Transaction') 
    
    def __str__(self):
        return self.name

class Transaction(models.Model):
    transaction_date = models.DateTimeField(auto_now_add=True)
    user_name = models.ManyToManyField('User') 
    product_list = models.ManyToManyField('Product') 
    total = models.DecimalField(max_digits=6, decimal_places=2) 
    
    def __str__(self):
        return self.id


class Product(models.Model):
    CATEGORY = (
        ('beverage','Beverage'), 
        ('cocktail','Cocktails'),
        ('appetizers','Appetizers'),
        ('entrees','Entrees'),
         ('desserts','Desserts'),
         ('sides','Sides')
    )
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2) 
    category =  models.CharField(max_length=1, choices=CATEGORY) 
    ingredients_list = models.ManyToManyField('Ingredient') 
    
    def __str__(self):
        return self.name



class Ingredient(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name