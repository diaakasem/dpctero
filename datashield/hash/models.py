from django.db import models
from django.utils.translation import ugettext_lazy as _
from datashield.models import TimeStamped
from datetime import datetime, timedelta
from process.models import Process


class Hash(TimeStamped):
    name = models.CharField(max_length=150, blank=True, null=True)
    weight = models.PositiveIntegerField(null=True, default=100)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    # In Hours
    period = models.IntegerField(null=True)
    related_country = models.CharField(max_length=255, null=True)

    process = models.ForeignKey(Process, null=True, related_name='hash_set')

    def save(self):
        #do some custom processing here: Example: convert Image resolution to a normalized value
        if not self.start_time:
            self.start_time = datetime.now()
        self.end_time = datetime.now()
        self.period = (self.end_time - self.start_time) // 3600
        # TODO: MAKE WEIGHT
        self.weight = 0
        for t in self.tweet_set.all():
            self.weight = self.weight + t.weight
        self.weight = self.weight / self.tweet_set.count() 
        super(Hash, self).save()

    class Meta:
        verbose_name = _('Hash')
        verbose_name_plural = _('Hashes')


