//call the packages
var
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000,
  app = express();


//start the server
app.listen(port, function(){
  console.log('The server is listening on port: ' + port)
});
