# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('process', '0001_initial'),
        ('hash', '0002_hash_period'),
    ]

    operations = [
        migrations.AddField(
            model_name='hash',
            name='process',
            field=models.ForeignKey(related_name=b'hash_set', to='process.Process', null=True),
            preserve_default=True,
        ),
    ]
