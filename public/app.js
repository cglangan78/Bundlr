$(document).ready(function(){
  var results = $('.results');
  console.log(results)


$(results).on('click', function(){
  $.ajax({
    url: '/youtube/popular',
    method: 'GET',
    contentType: 'application/json',
    success: function(data){
      console.log(data)
      data.forEach(function(url){
        var li = '<li>' + url.youtube_url + url._id + '</li>'
        $('.results').append(li);
      });
    }
   })
  })
})
