from tastypie.resources import ModelResource
from .models import Tweet
from .tasks import tweets
from datashield.api import MainResource


class TweetResource(MainResource):

    def prepend_urls(self):
        return [self.add_url('gettweets')]

    def gettweets(self, request, courses):
        self.method_check(request, allowed=['get'])
        tweets()
        resp = {'status': 'inprogress'}
        return self.create_response(request, resp)

    class Meta:
        queryset = Tweet.objects.all()
        resource_name = 'tweet'
