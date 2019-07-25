class User < ApplicationRecord
  has_many :user_products
  has_many :reviews
  has_many :products, through: :reviews 
end
