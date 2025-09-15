class Shelf < ApplicationRecord
  belongs_to :shop

  has_many :shelf_books, dependent: :destroy
  has_many :books, through: :shelf_books

  validates :name, presence: true, allow_blank: false

  def popular_genres
    books
      .joins(:genres)
      .group("genres.id", "genres.name")
      .order("COUNT(genres.id) DESC")
      .limit(3)
      .pluck("genres.name")
  end
end
