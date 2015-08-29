from tastypie.resources import ModelResource
from .models import Account
from core.api import MainResource


class AccountResource(MainResource):

    class Meta:
        queryset = Account.objects.all()
        resource_name = 'account'


