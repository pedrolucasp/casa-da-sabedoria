class Shop < ApplicationRecord
  belongs_to :user

  has_many :shelves, dependent: :destroy
  has_many :books, through: :shelves

  validates :name, presence: true
  validates :location, presence: true
end
