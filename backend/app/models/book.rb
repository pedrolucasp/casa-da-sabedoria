class Book < ApplicationRecord
  belongs_to :publisher

  has_many :book_authors
  has_many :authors, through: :book_authors

  has_many :shelf_books
  has_many :shelves, through: :shelf_books

  has_and_belongs_to_many :genres

  enum :condition, [:used, :new], default: :used, prefix: :condition
end
