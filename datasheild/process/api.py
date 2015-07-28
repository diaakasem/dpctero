from .models import Process
from core.api import MainResource


class ProcessResource(MainResource):

    class Meta:
        queryset = Process.objects.all()
        resource_name = 'process'
