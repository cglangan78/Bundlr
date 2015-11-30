var
  express = require('express'),
  request = require('request'),
  Search = require('../models/search.js'),
  searchRoutes = express.Router();

searchRoutes.get('/api', function(req, res){
  Search.find({}, function (err, data) {
    if (err) throw(err)
    res.json(data)
  })
});


module.exports = searchRoutes;
