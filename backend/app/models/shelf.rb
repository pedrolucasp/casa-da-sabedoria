class Shelf < ApplicationRecord
  belongs_to :shop

  has_many :shelf_books, dependent: :destroy
  has_many :books, through: :shelf_books
end
