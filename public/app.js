$(document).ready(function(){
  var $searchForm = $('#search-form');
  var $ytResults = $('#youtube-results');
  var $redditResults = $('#reddit-results');
  var $twitterResults = $('#twitter-results');
  var $searchResults = $('#search-results');

  function clearResults(){
      $ytResults.html('');
      $redditResults.html('');
      $twitterResults.html('');
      $searchResults.html('');
  }

  $searchForm.on('submit', function(evt){
    evt.preventDefault();
    //clear previous search results
    clearResults();
    //grabbing input value
    var $q = $('#search').val();
    //youtube specific
    var youtubeKey = 'AIzaSyCb8JsJ1jSYDDz9PihwYVgTJyiTTYaNpAw';
    var youtubeRequestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=' + $q + '&key=' + youtubeKey;
    $.ajax({
      method: 'GET',
      url: youtubeRequestUrl,
      contentType: 'application/json',
      success: function(data){
        // console.log(data);
        var url = 'https://www.youtube.com/watch?v='
        data.items.forEach(function(video){
          var fullUrl =  url + video.id.videoId;
          var thumbnail = '<img src="' + video.snippet.thumbnails.medium.url + ' ">';
          var li = '<li><a href="' + fullUrl + '" target="_blank">' + thumbnail + '</a></li>';
          $ytResults.append(li);
        });
      }
     })
    //reddit specific
    var redditRequestUrl = 'https://www.reddit.com/search.json?q=' + $q + '&limit=10&sort=hot';
    // console.log(redditRequestUrl);
    $.ajax({
      method: 'GET',
      url: redditRequestUrl,
      success: function(data){
        // console.log(data);
        data.data.children.forEach(function(post){
          var redditUrl = post.data.url;
          var li = '<li><a href="' + redditUrl + '" target="_blank">' + redditUrl + '</a></li>';
          $redditResults.append(li);
        });
      }
     })
     //twitter specific
     $.ajax({
       method: 'GET',
       url: '/twitter/searchTwitter/' + $q,
       success: function(data){
         data.forEach(function(tweet){
           var twitterText = tweet.text;
           var li = '<li>' + twitterText + '</li>';
           $twitterResults.append(li);
         });
       }
      })
    //search specific
    $.ajax({
      method: 'GET',
      url: '/search/api',
      success: function(data){
        var dataSpecific = data.splice(-5).reverse()
        dataSpecific.forEach(function(search){
          console.log(search.user_search)
          var searchResults = search.user_search;
          // var searchAgain = 'https://www.'
          // var li = '<li><a href="' + searchAgain + '" target="_blank">' + searchResults + '</a></li>';
          var li = '<li>' + searchResults + '</li>';
          $searchResults.append(li);
        })
      }
   })
 })
})
