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

  validates :name, presence: true
end
