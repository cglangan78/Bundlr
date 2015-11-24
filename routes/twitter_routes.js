var
  express = require('express'),
  Twit = require('twit'),
  twitterKeys = require('../config/twitter-keys.js'),
  twitterRoutes = express.Router();


//twitter enviormental variables
var twitter = new Twit({
 consumer_key: twitterKeys.consumer_key,
 consumer_secret: twitterKeys.consumer_secret,
 access_token: twitterKeys.access_token,
 access_token_secret: twitterKeys.access_token_secret
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
