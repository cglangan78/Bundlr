var
  express = require('express'),
  request = require('request'),
  twitterKeys = require('../config/twitter-keys.js'),
  Twit = require('twit'),
  Search = require('../models/search.js'),
  twitterRoutes = express.Router();

//twitter enviormental variables
var twitter = new Twit({
 consumer_key: twitterKeys.consumer_key,
 consumer_secret: twitterKeys.consumer_secret,
 access_token: twitterKeys.access_token,
 access_token_secret: twitterKeys.access_token_secret
});


twitterRoutes.get('/searchTwitter/:term', function(request, response){
  twitter.get('search/tweets', { q: request.params.term, count: 10 }, function(err, data, res) {
    response.json(data.statuses);
    var userSearch = Search({
   		       user_search: request.params.term
   	    })
      console.log(userSearch);
      userSearch.save(function(err){
      	if(err) throw err
    })
  })
});

module.exports = twitterRoutes;
