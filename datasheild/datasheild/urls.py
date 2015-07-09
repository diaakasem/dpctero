"""datasheild URL Configuration

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
from django.conf.urls import include, url
from django.contrib import admin
from tweet.api import TweetResource
from hash.api import HashResource
from account.api import AccountResource

tweet_resource = TweetResource()
hash_resource = HashResource()
account_resource = AccountResource()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/tweet/', include(tweet_resource.urls)),
    url(r'^api/hash/', include(hash_resource.urls)),
    url(r'^api/account/', include(account_resource.urls)),
]
