# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweet', '0002_auto_20150710_0725'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='weight',
            field=models.IntegerField(default=1),
            preserve_default=True,
        ),
    ]
