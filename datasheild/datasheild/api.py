import simplejson as json
from .error_msgs import Errors
from tastypie.cache import SimpleCache
from tastypie.http import HttpBadRequest
from tastypie.resources import Resource
from tastypie import fields
from core.resources import SearchResourceMixin, SevenResource
from .models import Country, Address
from .authorization import AddressAuthorization, CountryAuthorization
from .forms import CountryForm, AddressForm
from .validation import ModelFormValidation
from .utils import UIScriptError
from seven_users.authorization import resource_in_profiles, AdminAuthorization
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


def del_keys(obj, key, others, fields):
    if others:
        for k in obj.keys():
            if k not in fields:
                obj.pop(k, None)
    else:
        obj.pop(key, None)


def exclude_field(obj, field, others, fields):
    first_order_query = []
    second_order_query = []
    third_order_query = []
    for f in fields:
        f_query = f.split('__')
        if len(f_query) > 2:
            third_order_query.append(f_query[2])
        if len(f_query) > 1:
            second_order_query.append(f_query[1])
        first_order_query.append(f_query[0])

    subfields = field.split('__')
    if subfields and subfields[0] in obj:
        sub = obj.get(subfields[0])
        if len(subfields) > 1 and subfields[1] in sub.data:
            subsub = sub.data.get(subfields[1])
            if len(subfields) > 2 and subfields[2] in subsub.data:
                del_keys(subsub.data, subfields[2], others, third_order_query)
            del_keys(sub.data, subfields[1], others, second_order_query)
        del_keys(obj, field, others, first_order_query)


def exclude(obj, exfields, infields):
    for field in exfields:
        exclude_field(obj, field, False, exfields)
    for field in infields:
        exclude_field(obj, field, True, infields)


def filterable(dehydrate):
    """ Used to decorate dehydrate method
        provides a way to exclude fields
        query having exclude_fields=,,,, or/and only_fields=,,,,
        will result in excluding the listed fields or excluding the other
        fields in case of "only_fields"
    """
    def func(resource, bundle, **kwargs):
        exclude_fields = bundle.request.GET.get('exclude_fields', '')\
            .split(',')
        only_fields = bundle.request.GET.get('only_fields', '').split(',')
        exclude(bundle.data, exclude_fields, only_fields)
        return dehydrate(resource, bundle)
    return func


class CountryResource(SearchResourceMixin, SevenResource):

    def prepend_urls(self):
        return [self.add_url('disable'),
                self.add_url('enable')]

    @resource_in_profiles('admin')
    def disable(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        try:
            data = json.loads(request.body)
            countryid = data.get("country")
            Country.objects.filter(id=countryid).update(disabled=True)
            return self.create_response(request, {})
        except:
            msg = {'error': Errors.general_data_error}
            return self.create_response(request, msg, HttpBadRequest)

    @resource_in_profiles('admin')
    def enable(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        try:
            data = json.loads(request.body)
            countryid = data.get("country")
            Country.objects.filter(id=countryid).update(disabled=False)
            return self.create_response(request, {})
        except:
            msg = {'error': Errors.general_data_error}
            return self.create_response(request, msg, HttpBadRequest)

    class Meta:
        cache = SimpleCache(timeout=600)
        queryset = Country.objects.all()
        resource_name = 'country'
        authorization = CountryAuthorization()
        validation = ModelFormValidation(form_class=CountryForm)


class AddressResource(SearchResourceMixin, SevenResource):

    country = fields.ForeignKey(
        CountryResource, 'country', null=True, related_name='addresses')

    class Meta:
        cache = SimpleCache(timeout=600)
        queryset = Address.objects.select_related('country').all()
        resource_name = 'address'
        authorization = AddressAuthorization()
        validation = ModelFormValidation(form_class=AddressForm)

class JsErrorResource(Resource):
    url = fields.CharField(attribute='url')
    message = fields.CharField(attribute='message')
    error_type = fields.CharField(attribute='error_type')

    class Meta:
        resource_name = 'uiscripterror'
        object_class = UIScriptError
        authorization = AdminAuthorization()

    def detail_uri_kwargs(self, bundle_or_obj):
        kwargs = {}
        return kwargs

    def get_object_list(self, request):
        results = []
        return results

    def obj_get_list(self, bundle, **kwargs):
        # Filtering disabled for brevity...
        return self.get_object_list(bundle.request)

    def obj_get(self, bundle, **kwargs):
        pass

    def obj_create(self, bundle, **kwargs):
        bundle = self.full_hydrate(bundle)
        req_logger = logging.getLogger('django.request')
        req_logger.exception(
            '[js error] %s %s %s',
            bundle.obj.url,
            bundle.obj.message,
            bundle.obj.error_type
        )
        return bundle

