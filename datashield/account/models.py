from django.db import models
from django.utils.translation import ugettext_lazy as _
from hash.models import Hash
from datashield.models import TimeStamped
from process.models import Process


class Account(TimeStamped):

    account_id = models.CharField(max_length=150, blank=True, null=True, db_index=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    favourites_count = models.IntegerField(default=0)
    followers_count = models.IntegerField(default=0)
    geo_enabled = models.BooleanField(default=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=150, blank=True, null=True, db_index=True)
    screen_name = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    verified = models.BooleanField(default=True)
    weight = models.PositiveIntegerField(null=True, default=100)

    process = models.ForeignKey(Process, null=True, related_name='account_set')
    hashes = models.ManyToManyField(
        Hash, null=True, blank=True, related_name='account_set')

    def save(self):
        self.weight = 0
        for t in self.tweet_set.all():
            self.weight = self.weight + t.weight
        super(Account, self).save()


    class Meta:
        verbose_name = _('Hash')
        verbose_name_plural = _('Hashes')
