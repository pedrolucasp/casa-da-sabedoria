class CreatePublishers < ActiveRecord::Migration[8.0]
  def change
    create_table :publishers do |t|
      t.string :name
      t.string :location

      t.timestamps
    end
  end
end
