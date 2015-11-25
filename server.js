//call the packages
var
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.PORT || 3000,
  databaseLocal = 'mongodb://localhost/bundlr-db',
  database = 'mongodb://tester:tester@ds041613.mongolab.com:41613/bundlr-db',
  // youtubeRoutes = require('./routes/youtube_routes.js'),
  twitterRoutes = require('./routes/twitter_routes.js'),
  userRoutes  = require('./routes/user_routes.js'),
  User = require('./models/user.js'),
  // youtube = require('./models/youtube.js'),
  Twit = require('twit'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
	passportConfig = require('./config/passport.js'),
  app = express();

//establishes connection to MongoDB
mongoose.connect(databaseLocal, function(){
  console.log('Successfully connected to database: ' + databaseLocal);
});

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
  secret: 'Richlaptop',
  cookie: {_expires : 60000000}
}));

//ejs configuration
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', userRoutes);
app.use('/twitter', twitterRoutes);

//root route
app.get('/', function(req, res){
  res.render('index');
})

//start the server
app.listen(port, function(){
  console.log('The server is listening on port: ' + port)
});
