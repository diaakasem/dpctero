from tastypie.resources import ModelResource
from .models import Tweet
from datashield.api import MainResource


class TweetResource(MainResource):

    class Meta:
        queryset = Tweet.objects.all()
        resource_name = 'tweet'
