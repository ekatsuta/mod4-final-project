class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.text :whatitdoes
      t.text :howto
      t.string :image_src

      t.timestamps
    end
  end
end
