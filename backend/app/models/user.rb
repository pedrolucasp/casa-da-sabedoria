class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable,
    :trackable,
    :jwt_authenticatable,
    jwt_revocation_strategy: JwtDenylist
  # :confirmable,

  has_many :shops
  has_many :shelves, through: :shops
  has_many :books, through: :shelves

  validates :name, presence: true
end
