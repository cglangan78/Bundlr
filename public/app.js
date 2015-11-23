$(document).ready(function(){
  var $searchForm = $('#search-form');
  var $results = $('.results');

  function clearResults(){
      $results.html('');
  }

  $searchForm.on('submit', function(evt){
    evt.preventDefault();
    var $q = $('#search').val();
    var key = 'AIzaSyCb8JsJ1jSYDDz9PihwYVgTJyiTTYaNpAw';
    var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=' + $q + '&key=' + key;
    clearResults();
    $.ajax({
      method: 'GET',
      url: requestUrl,
      contentType: 'application/json',
      success: function(data){
        console.log(data)
        var url = 'https://www.youtube.com/watch?v='
        data.items.forEach(function(video){
          var li = '<li>' + url + video.id.videoId + '</li>'
          $results.append(li)
        });
      }
     })
    })
  })
