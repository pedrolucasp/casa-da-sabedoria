class CreateBooksGenresJoinTable < ActiveRecord::Migration[8.0]
  def change
    create_join_table :books, :genres do |t|
      t.index :book_id
      t.index :genre_id
    end
  end
end
