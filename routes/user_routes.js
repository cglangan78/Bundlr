var
  usersController = require('../controllers/users_controller.js'),
  express = require('express'),
  request = require('request'),
  userRoutes = express.Router();

userRoutes.route('/')
  .get(usersController.showUser)
  .post(usersController.createUser)

userRoutes.route('/:_id')
  .delete(usersController.destroyUser)
  .put(usersController.updateUser)


userRoutes.get('/popular', function(req,res){
  // var q = $('#query').val('cat');
  var key = 'AIzaSyCb8JsJ1jSYDDz9PihwYVgTJyiTTYaNpAw'
  var requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=obama&key=" + key;

  request(requestUrl, function(error, response, body) {
    var bodyArr = JSON.parse(body).items;
    for (var i = 0; i < bodyArr.length; i +=1) {
      var videoId = bodyArr[i].id.videoId;
      var url = 'https://www.youtube.com/watch?v=' + videoId
        console.log(url)
        res.json(url)
    }
  })
})


module.exports = userRoutes
