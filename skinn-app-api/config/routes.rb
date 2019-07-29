Rails.application.routes.draw do
  resources :reviews
  resources :categories
  resources :user_products
  resources :products
  resources :users

  get '/login', to: "users#login"
  post '/user_products/addProducts', to: "user_products#add_products"
  patch '/reviews/:id', to: "reviews#update"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
