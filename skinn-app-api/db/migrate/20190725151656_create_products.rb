class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :brand
      t.text :description
      t.string :skintype
      t.references :category, foreign_key: true
      t.string :img_path

      t.timestamps
    end
  end
end
