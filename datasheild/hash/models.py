from django.db import models
from django.utils.translation import ugettext_lazy as _
from datasheild.models import TimeStamped


class Hash(TimeStamped):
    name = models.CharField(max_length=150, blank=True, null=True)
    weight = models.PositiveIntegerField(null=True, default=100)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    related_country = models.CharField(max_length=255, null=True)

    class Meta:
        verbose_name = _('Hash')
        verbose_name_plural = _('Hashes')


