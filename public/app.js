$(document).ready(function(){
  var $searchForm = $('#search-form');
  var $resultsContainer = $('#results');
  var $ytResults = $('#youtube-results');
  var $redditResults = $('#reddit-results');
  var $twitterResults = $('#twitter-results');
  var $searchResults = $('#search-results');

  // clear results containers before appending new data
  function clearResults() {
    $ytResults.html('');
    $redditResults.html('');
    $twitterResults.html('');
    $searchResults.html('');
  }

  // helper function to convert UTC to dates
  function setDate(sec) {
    var utcSeconds = sec;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d.toString();
  }

  $searchForm.on('submit', function(evt){
    evt.preventDefault();
    //clear previous search results
    clearResults();
    $resultsContainer.css('display', 'block');
    $searchResults.css('display', 'block');
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
        console.log(data);
        $ytResults.html('<h2 class="ui dividing header">YouTube <i class="youtube square icon"></i></h2>');
        var url = 'https://www.youtube.com/watch?v='
        data.items.forEach(function(video){
          var fullUrl =  url + video.id.videoId;
          var thumbnail = '<img class="ui rounded image" src="' + video.snippet.thumbnails.medium.url + ' ">';
          var li = '<li class="inline-block ui feed raised red segment">';
              li += '<div>';
              li += '<a href="' + fullUrl + '" target="_blank">' + thumbnail + '</a>';
              li += '</div>';
              li += '</li>';
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
        console.log(data);
        $redditResults.html('<h2 class="ui dividing header">Reddit <i class="reddit square icon"></i></h2>');
        data.data.children.forEach(function(post){
          var redditUrl = post.data.url;
          var thumbnail = post.data.thumbnail;
          var title = post.data.title;
          var created = (setDate(post.data.created)).slice(3,15);
          console.log(created);
          var subreddit = post.data.subreddit;
          var li = '<li class="item">';
              li += '<div class="ui tiny image">';
              if (thumbnail === 'self' || !thumbnail) { // if thumbnail is a bust, use a reddit icon
                li += '<i class="disabled huge reddit icon"></i>'
              } else {
                li += '<img src="' + thumbnail + '" class="img-rounded">';
              };
              li += '</div>';
              li += '<div class="content">';
              li += '<a href="' + redditUrl + '" class="header">' + title + '</a>';
              li += '<div class="meta text-muted">';
              li += '<span>' + created + '</span>';
              li += '</div>';
              li += '<div class="extra text-muted">/r/';
              li += '<a href="http://www.reddit.com/r/' + subreddit + '" target="_blank">' + subreddit + '</a>';
              li += '</div>';
              li += '</div>';
              li += '</li>';
          $redditResults.append(li);
        });
      }
     })
     //twitter specific
     $.ajax({
       method: 'GET',
       url: '/twitter/searchTwitter/' + $q,
       success: function(data){
         console.log(data);
         $twitterResults.html('<h2 class="ui dividing header">Twitter <i class="twitter square icon"></i></h2>');
         data.forEach(function(tweet){
           var profileUrl = 'http://twitter.com/' + tweet.user.screen_name;
           var twitterText = tweet.text;
           var createdMonDay = tweet.created_at.slice(3,10);
           var createdYear = tweet.created_at.slice(-4);
           var created = createdMonDay + ' ' + createdYear;
           var profileImg = '<a href="' + profileUrl + '" target="_blank"><img src="' + tweet.user.profile_image_url_https + '"></a>';
           var li = '<li class="ui feed raised blue segment">';
               li += '<div class="event">';
               li += '<div class="label">' + profileImg + '</div>';
               li += '<div class="content">';
               li += '<div class="date">' + created + '</div>';
               li += '<div class="extra text">' + twitterText + '</div>';
               li += '</div></div></li>';
           $twitterResults.append(li);
         });
       }
      })
      //search specific
    $.ajax({
      method: 'GET',
      url: '/search/api',
      success: function(data){
        var dataSpecific = data.splice(-5).reverse();
        $searchResults.html('<h5>Most recent searches: </h5>');
        dataSpecific.forEach(function(search){
          console.log(search.user_search)
          var searchResults = search.user_search;
          var li = '<li class="inline-block">' + searchResults + ' / </li>';
          $searchResults.append(li);
          })
        }
      })
    })
  })
