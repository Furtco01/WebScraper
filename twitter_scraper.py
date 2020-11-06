##### imports needed for script
import tweepy
import pandas as pd
import time

##### Credentials to access Twitter API
##### TODO: Put these in another file and reference them
consumer_key = 'hVYEbosmMILF55ff1hh1p3s2Y'
consumer_secret = 'LBXn7GtJEXJoIalokaNJuO6jfaztt4vjarIZcgAfuBzZpykHBy'
access_token = '1324358150250745859-yVXqgiA83X4aMEfFHxArpIcAFEgo35'
access_token_secret = 'ipwu4J2VLfyGBfVSNAHixgFs8fv6BaVK7AumCsuBV85we'
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

##### Handle authentication with above credentials
api = tweepy.API(auth,wait_on_rate_limit=True)

##### Twitter user handle to be scraped
username = 'seangarrette'
##### Number of tweets collected
count = 150

##### Function to pick out useful data from tweet scrape
def handleTweetResults(data):
      ##### Define the new names of your columns
      newcols = {
      0: 'DateTime', 
      1: 'Hash', 
      2: 'Tweet'
      }
      ###### Use `rename()` to rename your columns
      tweets_df.rename(columns=newcols, inplace=True)

      ##### Trim original dataframe using string value conditions
      ##### This removes retweets by cutting rows that start with RT
      tweets_df2 = tweets_df[~tweets_df["Tweet"].str.contains("RT")]
      ##### This targets tweets by cutting rows without mention of a sale
      tweets_df3 = tweets_df2[tweets_df2["Tweet"].str.contains("sale", case=False)]

      #iterate through rows and print only columns named DateTime and Tweet
      for index, row in tweets_df2.iterrows():
            #####print(row['DateTime'], row['Tweet'])
            print(row['Hash'])
      ##### PSEUDO CODE
      hash_list = printed rows

      #tweets_df3.to_csv (r'./output/output.csv', header=True)


try:     
  #Creation of query method using parameters
 tweets = tweepy.Cursor(api.user_timeline,id=username, exclude_replies=True).items(count)
 
  #Pulling information from tweets iterable object
 tweets_list = [[tweet.created_at, tweet.id, tweet.text]for tweet in tweets]
 #print(tweets_list[0])

  #Creation of dataframe from tweets list
  #Add or remove columns as you remove tweet information
 tweets_df = pd.DataFrame(tweets_list)
except BaseException as e:
      print('failed on_status,',str(e))
      time.sleep(3)

handleTweetResults(tweets_df)

##### Pass result of handleTweetResults to status and find image url for saving

#id = handleTweetResults(tweets_df)
#status = api.get_status(id)
#print(status.entities)