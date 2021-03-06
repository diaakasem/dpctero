# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import audit_log.models.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Hash',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_with_session_key', audit_log.models.fields.CreatingSessionKeyField(max_length=40, null=True, editable=False)),
                ('modified_with_session_key', audit_log.models.fields.LastSessionKeyField(max_length=40, null=True, editable=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=150, null=True, blank=True)),
                ('weight', models.PositiveIntegerField(default=100, null=True)),
                ('start_time', models.DateTimeField(null=True)),
                ('end_time', models.DateTimeField(null=True)),
                ('related_country', models.CharField(max_length=255, null=True)),
                ('created_by', audit_log.models.fields.CreatingUserField(related_name=b'created_hash_hash_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='created by')),
                ('modified_by', audit_log.models.fields.LastUserField(related_name=b'modified_hash_hash_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='modified by')),
            ],
            options={
                'verbose_name': 'Hash',
                'verbose_name_plural': 'Hashes',
            },
            bases=(models.Model,),
        ),
    ]
