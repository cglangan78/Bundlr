//call the packages
var
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000,
  database = 'mongodb://localhost:3000/bundlr-db'
  //database = 'mongodb://tester:tester@ds041613.mongolab.com:41613/bundlr-db'

  app = express();

//establishes connection to MongoDB
mongoose.connect(database);

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//start the server
app.listen(port, function(){
  console.log('The server is listening on port: ' + port)
});
