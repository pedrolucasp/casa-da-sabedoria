class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable,
    :confirmable,
    :trackable,
    :jwt_authenticatable,
    jwt_revocation_strategy: JwtDenylist

  validates :name, presence: true
end
