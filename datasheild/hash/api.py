from tastypie.resources import ModelResource
from .models import Hash


class HashResource(ModelResource):

    class Meta:
        queryset = Hash.objects.all()
        resource_name = 'hash'

