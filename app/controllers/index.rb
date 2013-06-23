get '/' do
  erb :index
end

post '/say' do
  link_test = /https?:\/\//i
  youtube_test = /v=[a-z0-9_]*/i
  text = params[:text]

  if !!(link_test.match(text))
    if !!(youtube_test.match(text))
      Clip.find_or_create_by_url({url: text})
      youtube_id = $&
      Pusher.trigger(PUSHER_CHANNEL, 'add_clip', {:clip => text })
    else
      Pusher.trigger(PUSHER_CHANNEL, 'add_chat', {:chat => "#{text} does not appear to be a valid youtube clip"})
    end
  else
    Pusher.trigger(PUSHER_CHANNEL, 'add_chat', {:chat => text})
  end
end



post '/pusher/auth' do
  if true # replace w/current_user
    response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
      :user_id => rand, # => required
      :user_info => {}
    })
    response.to_json
  else
    status 403
  end
end
