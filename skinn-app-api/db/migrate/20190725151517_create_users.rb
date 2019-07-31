class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.string :profile_img
      t.string :user_skintype

      t.timestamps
    end
  end
end
