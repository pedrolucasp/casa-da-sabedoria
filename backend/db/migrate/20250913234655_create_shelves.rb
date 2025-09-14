class CreateShelves < ActiveRecord::Migration[8.0]
  def change
    create_table :shelves do |t|
      t.string :name
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
