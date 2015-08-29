# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('process', '0001_initial'),
        ('tweet', '0003_tweet_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='process',
            field=models.ForeignKey(related_name=b'tweet_set', to='process.Process', null=True),
            preserve_default=True,
        ),
    ]
