class UserProduct < ApplicationRecord
  belongs_to :user
  belongs_to :product

  def self.createUserProduct(products, user_id)
    newCollection = products.map do |product|
      self.create(user_id: user_id, product_id: product["id"])
    end
  end

  def self.find_user_product(user_id, category_id)
    this_users_products = self.all.select do |user_product|
      user_product.user_id == user_id
    end

    foundProduct = this_users_products.find do |user_product|
      product = Product.find(user_product.product_id)
      product.category_id == category_id
    end

  end

end
