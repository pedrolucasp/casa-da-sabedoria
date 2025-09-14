class Shop < ApplicationRecord
  belongs_to :user

  has_many :shelves, dependent: :destroy

  validates :name, presence: true
  validates :location, presence: true
end
