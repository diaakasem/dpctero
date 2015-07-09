from datasheild.settings import celery_app as app
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
    tweet_str = []

    for tweet in tweepy.Cursor(api.search, q='egypt', rpp=100).items(10):
        # if tweet.geo:
            # print tweet.withheld_in_countries
        tweets = []
        tweets.append('%s' % tweet.id)
        tweets.append('%s' % tweet.id)
        tweets.append('%s' % tweet.place)
        tweets.append('%s' % tweet.geo)
        tweets.append('%s' % tweet.created_at)
        tweets.append('%s' % tweet.text)
        tweets = ', '.join(tweets)
        tweet_str.append(tweets)

    f = open('~/workfile', 'w')
    all = '<br/>'.join(tweet_str)
    f.write(all)


