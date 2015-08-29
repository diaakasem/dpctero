# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('process', '0001_initial'),
        ('account', '0002_auto_20150710_0725'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='process',
            field=models.ForeignKey(related_name=b'account_set', to='process.Process', null=True),
            preserve_default=True,
        ),
    ]
