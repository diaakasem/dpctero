from django.db import models
from django.utils.translation import ugettext_lazy as _
from datashield.models import TimeStamped
from datetime import datetime, timedelta


class Process(TimeStamped):

    name = models.CharField(max_length=150, blank=True, null=True)
    # Just the test of the hash tag to start with
    hashtag = models.CharField(max_length=150, blank=True, null=True)
    start_time = models.DateTimeField(null=True)

    def save(self):
        #do some custom processing here: Example: convert Image resolution to a normalized value
        if not self.start_time:
            self.start_time = datetime.now()
        super(Process, self).save()

    class Meta:
        verbose_name = _('Process')
        verbose_name_plural = _('Processes')


