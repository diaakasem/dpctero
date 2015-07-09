# Get an instance of a logger
from django.conf.urls import url
from tastypie.resources import ModelResource
from tastypie.utils import trailing_slash
import logging
logger = logging.getLogger(__name__)


class MainResource(ModelResource):

    """The Base Resource for Tastypie APIs in Elproff system"""
    # Endpoint refers to function in the Resource eg. function_data_whatever
    # IMPORTANT: URL will be replaced to function/data/whatever

    def add_url(self, endpoint):
        """Adds additional urls to the resource

        :endpoint: the end point API to be added
        :returns: the url created ( for tastypie )

        """
        api = r'(?P<resource_name>%s)/(?P<endpoint>%s)%s$' % (
            self._meta.resource_name, endpoint, trailing_slash())
        endpoint = endpoint.replace('/', '_')
        return url(api, self.wrap_view(endpoint), name='api_%s' % endpoint)

    def get_object_list(self, request):
        return super(MainResource, self).get_object_list(request).distinct()

