class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_many :products, include_nested_associations: true
end
