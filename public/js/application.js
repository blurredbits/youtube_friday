var online = null;
  $().ready(function(){
    $('input[name=text]').focus();
    var pusher = new Pusher('f206b222ae6d845db32e');
    // public channel
    var channel = pusher.subscribe('clips');

    channel.bind('add_clip', function(data) {
      $('#text_boxes').prepend($('<p class="clip"><a href="'+data.clip+'" target="_blank">'+data.clip+'</a></p>'));
    });

    channel.bind('add_chat', function(data) {
      $('#text_boxes').prepend($('<p class="chat">' + data.chat + '</p>'));
    })

    $('#say').submit(function(){
      $.post('say', $(this).serialize(), function(data){
        $('input[name=text]').val(null);
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
