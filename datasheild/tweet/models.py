from django.db import models
from django.utils.translation import ugettext_lazy as _
from account.models import Account
from hash.models import Hash
from datasheild.models import TimeStamped


class Tweet(TimeStamped):

    tweet_id = models.CharField(max_length=150, blank=True, null=True)
    place = models.CharField(max_length=150, blank=True, null=True)
    text = models.CharField(max_length=150, blank=True, null=True)
    latitude = models.CharField(max_length=50, blank=True, null=True)
    longitude = models.CharField(max_length=50, blank=True, null=True)

    favorite_count = models.IntegerField(default=0)
    favorited = models.BooleanField(default=False)
    retweet_count = models.IntegerField(default=0)
    retweeted = models.BooleanField(default=False)

    account = models.ForeignKey(Account, related_name='tweet_set')
    hashes = models.ManyToManyField(
        Hash, null=True, blank=True, related_name='tweet_set')

    class Meta:
        verbose_name = _('Tweet')
        verbose_name_plural = _('Tweets')


