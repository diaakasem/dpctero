from django.db import models
from django.utils.translation import ugettext_lazy as _
from hash.models import Hash
from datasheild.models import TimeStamped


class Account(TimeStamped):
    hashes = models.ManyToManyField(
        Hash, null=True, blank=True, related_name='account_set')
    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    weight = models.PositiveIntegerField(null=True, default=100)

    class Meta:
        verbose_name = _('Hash')
        verbose_name_plural = _('Hashes')
