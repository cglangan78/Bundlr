//call the packages
var
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000,
  databaseLocal = 'mongodb://localhost/bundlr-db',
  database = 'mongodb://tester:tester@ds041613.mongolab.com:41613/bundlr-db',
  youtubeRoutes = require('./routes/youtube_routes.js'),
  userRoutes  = require('./routes/user_routes.js'),
  User = require('./models/user.js'),
  youtube = require('./models/youtube.js'),
  app = express();

//establishes connection to MongoDB
mongoose.connect(databaseLocal, function(){
  console.log('Successfully connected to database: ' + databaseLocal);
});

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/user', userRoutes);
app.use('/youtube', youtubeRoutes);

// app.get('/', function(req, res){
//     youtube.find({}, function(err){
//         res.render('index');
//     });
// });


//start the server
app.listen(port, function(){
  console.log('The server is listening on port: ' + port)
});
