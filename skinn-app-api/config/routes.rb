Rails.application.routes.draw do
  resources :reviews
  resources :categories
  resources :user_products
  resources :products
  resources :users

  post '/signup', to: "users#create"
  post '/login', to: "auth#login"
  patch '/editprofile', to: "users#editimage"

  get '/auto_login', to: "auth#auto_login"

  post '/user_products/addProducts', to: "user_products#add_products"
  post '/user_products/swap', to: "user_products#swap"
  patch 'users/:id', to: "users#update"

  patch '/reviews/:id', to: "reviews#update"
  delete '/reviews/:id', to: "reviews#destroy"







  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
