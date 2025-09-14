class CreateShelfBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :shelf_books do |t|
      t.references :shelf, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true

      t.timestamps
    end
  end
end
