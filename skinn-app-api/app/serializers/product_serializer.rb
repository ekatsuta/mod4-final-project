class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :brand, :description, :skintype, :img_path, :category
  belongs_to :category, include_nested_associations: true
end
