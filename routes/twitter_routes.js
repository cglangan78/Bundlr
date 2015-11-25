var
  express = require('express'),
  request = require('request'),
  Twit = require('twit'),
  Search = require('../models/search.js'),
  twitterRoutes = express.Router();

//twitter enviormental variables
var twitter = new Twit({
 consumer_key: process.env.CONSUMER_KEY,
 consumer_secret: process.env.CONSUMER_SECRET,
 access_token: process.env.ACCESS_TOKEN,
 access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


twitterRoutes.get('/searchTwitter/:term', function(request, response){
  twitter.get('search/tweets', { q: request.params.term, count: 10, result_type: 'recent' }, function(err, data, res) {
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
