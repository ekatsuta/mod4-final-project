class UserProductSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id, :product, :category
  has_one :user
  has_one :product, include_nested_associations: true

  def category
    return object.product.category
  end

end
