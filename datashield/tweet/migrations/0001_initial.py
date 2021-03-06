# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import audit_log.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
        ('hash', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tweet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_with_session_key', audit_log.models.fields.CreatingSessionKeyField(max_length=40, null=True, editable=False)),
                ('modified_with_session_key', audit_log.models.fields.LastSessionKeyField(max_length=40, null=True, editable=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('tweet_id', models.CharField(max_length=150, null=True, blank=True)),
                ('place', models.CharField(max_length=150, null=True, blank=True)),
                ('text', models.CharField(max_length=150, null=True, blank=True)),
                ('latitude', models.CharField(max_length=50, null=True, blank=True)),
                ('longitude', models.CharField(max_length=50, null=True, blank=True)),
                ('account', models.ForeignKey(related_name=b'tweet_set', to='account.Account')),
                ('created_by', audit_log.models.fields.CreatingUserField(related_name=b'created_tweet_tweet_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='created by')),
                ('hashes', models.ManyToManyField(related_name=b'tweet_set', null=True, to='hash.Hash', blank=True)),
                ('modified_by', audit_log.models.fields.LastUserField(related_name=b'modified_tweet_tweet_set', editable=False, to=settings.AUTH_USER_MODEL, null=True, verbose_name='modified by')),
            ],
            options={
                'verbose_name': 'Tweet',
                'verbose_name_plural': 'Tweets',
            },
            bases=(models.Model,),
        ),
    ]
