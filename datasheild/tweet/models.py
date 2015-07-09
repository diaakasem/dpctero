from django.db import models
from django.utils.translation import ugettext_lazy as _
from account.models import Account
from hash.models import Hash
from datasheild.models import TimeStamped


class Tweet(TimeStamped):
    account = models.ForeignKey(Account, related_name='tweet_set')
    hashes = models.ManyToManyField(
        Hash, null=True, blank=True, related_name='tweet_set')
    text = models.CharField(
        max_length=150, blank=True, null=True)

    class Meta:
        verbose_name = _('Tweet')
        verbose_name_plural = _('Tweets')


