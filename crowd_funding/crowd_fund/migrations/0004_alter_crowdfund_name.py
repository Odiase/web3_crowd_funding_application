# Generated by Django 4.1.4 on 2023-01-04 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("crowd_fund", "0003_alter_crowdfund_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="crowdfund",
            name="name",
            field=models.CharField(max_length=100),
        ),
    ]
