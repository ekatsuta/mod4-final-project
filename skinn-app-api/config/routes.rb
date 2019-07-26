Rails.application.routes.draw do
  resources :reviews
  resources :categories
  resources :user_products
  resources :products
  resources :users

  get '/login', to: "users#login"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
