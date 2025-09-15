class BookSerializer < ApplicationSerializer
  delegate :id, :title, :updated_at, :year, to: :object

  view :summary do |v|
    v.attributes :id, :title, :updated_at
  end

  view :detailed do |v|
    v.attributes :id, :title, :updated_at, :year
  end
end
