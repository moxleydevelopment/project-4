from rest_framework import serializers

from .models import User, Transaction, Product, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name')


class ProductSerializer(serializers.ModelSerializer):
    ingredients_list = IngredientSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category', 'ingredients_list')
    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients_list')
        product = Product.objects.create(**validated_data)
        for  value in ingredients:
            item = Ingredient.objects.get(name=value['name'])
            
            product.ingredients_list.add(item)
            print(product)
        return product
    
    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients_list')
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.category = validated_data.get('category', instance.category)
        instance.ingredients_list.clear()
        instance.save
        for value in ingredients_data:
            item = Ingredient.objects.get(name=value['name'])
            instance.ingredients_list.add(item)
        return instance    

        


class TransactionSerializer(serializers.ModelSerializer):
    product_list = ProductSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ('id', 'transaction_date',
                  'user_name', 'product_list', 'total')
    
    def create(self,validated_data):
        product_data = validated_data.pop('product_list')
        user_data = validated_data.pop('user_name')
        transaction = Transaction.objects.create(**validated_data)
        user = User.objects.get(name=user_data[0])
        transaction.user_name.add(user)
        for value in product_data:
            product = Product.objects.get(name=value['name'])
            transaction.product_list.add(product)
        return transaction    



class UserSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'name', 'passcode', 'transaction')
