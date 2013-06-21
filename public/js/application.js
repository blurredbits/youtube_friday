var online = null;
  $().ready(function(){
    $('input[name=clip]').focus();
    var pusher = new Pusher('f206b222ae6d845db32e');
    // public channel
    var channel = pusher.subscribe('clips');

    channel.bind('add_clip', function(data) {
      //console.log(data.clip);
      $('#clip_boxes').prepend($('<p class="clip"><a href="'+data.clip+'" target="_blank">'+data.clip+'</a></p>'));
    });

    $('#say').submit(function(){
      $.post('say', $(this).serialize(), function(data){
        $('input[name=clip]').val(null);
      });
      return false;
    });
    // presence channel
    presenceChannel = pusher.subscribe('presence-clips');
    presenceChannel.bind('pusher:subscription_succeeded', function(members) {
      online = members.count;
      $('#online span').text(online)
    });
    presenceChannel.bind('pusher:member_added', function(member) {
      online += 1;
      $('#online span').text(online)
    });
    presenceChannel.bind('pusher:member_removed', function(member) {
      online -= 1;
      $('#online span').text(online)
    });
  }); // ready
