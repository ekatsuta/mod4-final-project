class Product < ApplicationRecord
  belongs_to :category
  has_many :user_products
  has_many :reviews
  has_many :users, through: :reviews
end
