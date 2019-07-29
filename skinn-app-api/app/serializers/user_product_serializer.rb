class UserProductSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id, :product
  has_one :user
  has_one :product, include_nested_associations: true
end
