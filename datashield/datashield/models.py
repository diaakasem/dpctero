from django.db import models
from audit_log.models import AuthStampedModel
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class TimeStamped(AuthStampedModel):
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    last_modified = models.DateTimeField(editable=False, auto_now=True)

    class Meta:
        abstract = True
