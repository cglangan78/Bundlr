// var
//   express = require('express'),
//   request = require('request'),
//   youtubeRoutes = express.Router();
//   youtube = require('../models/youtube.js');
//
//
// youtubeRoutes.get('/popular', function(req,res){
//   var key = 'AIzaSyCb8JsJ1jSYDDz9PihwYVgTJyiTTYaNpAw';
//   var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=' + q + '&key=' + key;
// //
//   request(requestUrl, function(error, response, body) {
//     var bodyArr = JSON.parse(body).items;
//     for (var i = 0; i < bodyArr.length; i +=1) {
//       var videoId = bodyArr[i].id.videoId;
//       var url = 'https://www.youtube.com/watch?v=' + videoId
//         console.log(url);
//       var popularYoutubeURL = youtube({
// 		       youtube_url: url
// 	    })
//         popularYoutubeURL.save(function(err){
//    			if(err) throw err;
//       })
//     }
//     res.json(bodyArr);
//   })
// })
//
//
// module.exports = youtubeRoutes;
