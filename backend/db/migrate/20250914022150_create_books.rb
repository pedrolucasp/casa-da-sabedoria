class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title
      t.text :description
      t.integer :year
      t.integer :status, default: 0
      t.references :publisher, null: false, foreign_key: true

      t.timestamps
    end
  end
end
