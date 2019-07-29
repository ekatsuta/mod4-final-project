class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_products, include_nested_associations: true
  has_many :products, include_nested_associations: true

end
