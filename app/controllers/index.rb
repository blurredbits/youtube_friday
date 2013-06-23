get '/' do
  erb :index
end

post '/say' do
  clip = params[:clip]
  Pusher.trigger(PUSHER_CHANNEL, 'add_clip', {:clip => clip })
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

# var linkTest = /https?:\/\//i;
# var youtubeTest = /v=[a-z0-9]*/i;
