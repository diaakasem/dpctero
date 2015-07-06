
import tweepy

consumer_key = 'AqZSjhlK8V5sORLe2uX7MDxhV'
consumer_secret = 'KQa4x3HBnD5fwDBYcbJU8dzaJxV1FmzGw6XBbTRwlZuXL3vgMv'

access_token = '52365348-lfR9z81SrbtUB3YfcX0QvKFf7FxVtnduoarAvVChs'
access_token_secret = 'rVzZxfKDbMCS4VmvsKJw4qfCkRylsaK7kQrJF4KPBddeP'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

tweets = []

for tweet in tweepy.Cursor(api.search, q='egypt', rpp=100).items(1000):
    #if tweet.geo: 
        # print tweet.withheld_in_countries
    print tweet.id
    print tweet.place
    print tweet.geo
    print tweet.created_at
    print tweet.text
    print '='*80
