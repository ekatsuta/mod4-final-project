class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :howto, :image_src, :whatitdoes
  # has_many :products, include_nested_associations: true
end
