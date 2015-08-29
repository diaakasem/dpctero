from datashield.settings import celery_app as app
from .models import Tweet
from account.models import Account
import tweepy

consumer_key = 'AqZSjhlK8V5sORLe2uX7MDxhV'
consumer_secret = 'KQa4x3HBnD5fwDBYcbJU8dzaJxV1FmzGw6XBbTRwlZuXL3vgMv'

access_token = '52365348-lfR9z81SrbtUB3YfcX0QvKFf7FxVtnduoarAvVChs'
access_token_secret = 'rVzZxfKDbMCS4VmvsKJw4qfCkRylsaK7kQrJF4KPBddeP'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


@app.task
def tweets():
    tweets = []

    for tweet in tweepy.Cursor(api.search, q='ISIS', rpp=100).items(100):
        latitude = None
        longitude = None
        if tweet.geo:
            latitude = None
            longitude = None
            #latitude = tweet.geo.latitude
            #longitude = tweet.geo.longitude
        print dir(tweet)
        print '='*80
        print dir(tweet.author)
        print '='*80
        accounts = Account.objects.filter(account_id=tweet.author.id_str)
        if accounts.count():
            account = accounts.first()
        else:
            tAccount = tweet.author
            account = Account(
                account_id=tAccount.id_str,
                description=tAccount.description,
                favourites_count=tAccount.favourites_count,
                followers_count=tAccount.followers_count,
                geo_enabled=tAccount.geo_enabled,
                location=tAccount.location,
                name=tAccount.name,
                screen_name=tAccount.screen_name,
                url=tAccount.url,
                verified=tAccount.verified
                )
            account.save()

        tweets.append(Tweet(
            tweet_id=tweet.id_str,
            place=tweet.place,
            latitude=latitude,
            longitude=longitude,
            created_at=tweet.created_at,
            text=tweet.text,
            retweet_count=tweet.retweet_count,
            retweeted=tweet.retweeted,
            favorite_count=tweet.favorite_count,
            favorited=tweet.favorited,
            account=account
            ))
    Tweet.objects.bulk_create(tweets)
