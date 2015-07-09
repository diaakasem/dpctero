from tastypie.resources import ModelResource
from .models import Tweet


class TweetResource(ModelResource):

    class Meta:
        queryset = Tweet.objects.all()
        resource_name = 'tweet'
