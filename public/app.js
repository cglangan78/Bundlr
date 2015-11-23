$(document).ready(function(){
  var submitbtn = $('#submit-btn')
  var searchForm = $('#search-form')
  console.log(submitbtn)

  searchForm.on('submit', function(evt){
    evt.preventDefault()
    console.log('clicked')
    $.ajax({
      url: '/youtube/popular',
      method: 'GET',
      contentType: 'application/json',
      success: function(data){
        console.log(data)
        var url = 'https://www.youtube.com/watch?v='
        data.forEach(function(video){
          var li = '<li>' + url + video.id.videoId + '</li>'
          $('.results').append(li)
        });
      }
     })
    })
  })
