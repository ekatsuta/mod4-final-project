class UserProduct < ApplicationRecord
  belongs_to :user
  belongs_to :product

  def self.createUserProduct(products, user_id)
    newCollection = products.map do |product|
      self.create(user_id: user_id, product_id: product["id"])
    end
  end

end
