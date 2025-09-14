class CreateShops < ActiveRecord::Migration[8.0]
  def change
    create_table :shops do |t|
      t.string :name
      t.string :location
      t.text :bio
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
