# Generated by Django 2.2.4 on 2019-08-17 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos_app', '0003_auto_20190813_2045'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredient',
            name='isInStock',
        ),
        migrations.RemoveField(
            model_name='product',
            name='ingredients_list',
        ),
        migrations.AddField(
            model_name='product',
            name='ingredients_list',
            field=models.CharField(default='item', max_length=255),
        ),
    ]
