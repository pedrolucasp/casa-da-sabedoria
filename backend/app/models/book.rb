class Book < ApplicationRecord
  belongs_to :publisher
  has_and_belongs_to_many :genres

  enum :condition, [:used, :new], default: :used, prefix: :condition
end
