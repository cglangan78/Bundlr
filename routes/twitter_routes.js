var
  express = require('express'),
  Twit = require('twit'),
  twitterRoutes = express.Router();


//twitter enviormental variables
var twitter = new Twit({
 consumer_key: process.env.TWITTER_CONSUMER_KEY,
 consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 access_token: process.env.TWITTER_ACCESS_TOKEN,
 access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

console.log(twitter);


twitterRoutes.get('/searchTwitter/:term', function(request, response){
  console.log('the query term is: ', request.params.term)
  twitter.get('search/tweets', { q: request.params.term, count: 10 }, function(err, data, res) {
    console.log(data);
    response.json(data.statuses);
  })
})

module.exports = twitterRoutes;
