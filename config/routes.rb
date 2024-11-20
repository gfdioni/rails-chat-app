Rails.application.routes.draw do
  devise_for :users
  resources :users
  root controller: :rooms, action: :index

  resources :room_messages
  resources :rooms

  post "username" => "users#createGuest"
end
