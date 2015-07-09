from tastypie.resources import ModelResource
from .models import Account


class AccountResource(ModelResource):

    class Meta:
        queryset = Account.objects.all()
        resource_name = 'account'


