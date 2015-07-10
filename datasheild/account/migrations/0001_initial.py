# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import audit_log.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hash', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_with_session_key', audit_log.models.fields.CreatingSessionKeyField(max_length=40, null=True, editable=False)),
                ('modified_with_session_key', audit_log.models.fields.LastSessionKeyField(max_length=40, null=True, editable=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('username', models.CharField(max_length=150, null=True, blank=True)),
                ('email', models.CharField(max_length=255, null=True, blank=True)),
                ('weight', models.PositiveIntegerField(default=100, null=True)),
                ('created_by', audit_log.models.fields.CreatingUserField(related_name=b'created_account_account_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='created by')),
                ('hashes', models.ManyToManyField(related_name=b'account_set', null=True, to='hash.Hash', blank=True)),
                ('modified_by', audit_log.models.fields.LastUserField(related_name=b'modified_account_account_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='modified by')),
            ],
            options={
                'verbose_name': 'Hash',
                'verbose_name_plural': 'Hashes',
            },
            bases=(models.Model,),
        ),
    ]
