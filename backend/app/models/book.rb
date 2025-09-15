class Book < ApplicationRecord
  belongs_to :publisher

  has_one_attached :cover, dependent: :destroy
  has_many_attached :photos, dependent: :destroy

  has_many :book_authors, dependent: :destroy
  has_many :authors, through: :book_authors

  has_many :shelf_books, dependent: :destroy
  has_many :shelves, through: :shelf_books

  has_and_belongs_to_many :genres

  enum :condition, [:used, :new], default: :used, prefix: :condition
end
