class ShelfSerializer < ApplicationSerializer
  attributes :id, :name, :books_count, :popular_genres, :updated_at

  delegate :id, :name, :updated_at, :popular_genres, to: :object

  def books_count
    object.books.count
  end
end
