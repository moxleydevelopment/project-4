# Generated by Django 2.2.4 on 2019-08-13 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos_app', '0002_auto_20190813_2025'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='isInStock',
            field=models.NullBooleanField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='ingredients_list',
            field=models.ManyToManyField(limit_choices_to={'isInStock': True}, to='pos_app.Ingredient'),
        ),
    ]
