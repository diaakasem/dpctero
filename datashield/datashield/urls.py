"""datashield URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from tastypie.api import Api
from django.contrib import admin
from django.conf.urls import include, url, patterns
from django.conf.urls.static import static
from django.conf import settings
from tweet.api import TweetResource
from hash.api import HashResource
from process.api import ProcessResource
from account.api import AccountResource
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)

v1_api = Api(api_name='v1')

v1_api.register(TweetResource())
v1_api.register(AccountResource())
v1_api.register(HashResource())
v1_api.register(ProcessResource())

# API Entry Point
urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

