from .models import Hash
from core.api import MainResource


class HashResource(MainResource):

    class Meta:
        queryset = Hash.objects.all()
        resource_name = 'hash'
