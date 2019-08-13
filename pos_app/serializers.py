from rest_framework import serializers

from .models import User, Transaction, Product, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name')


class ProductSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('name', 'price', 'category', 'ingredients')


        
class TransactionSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta: 
        model = Transaction
        fields = ('transaction_date', 'user_name', 'product_list', 'total')

 
class UserSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True) 
    
    class Meta:
        model = User
        fields = ('name', 'passcode', 'transactions')

