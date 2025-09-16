class AuthorSerializer < ApplicationSerializer
  delegate :id, :name, :bio, :updated_at, to: :object
  association :books, serializer: BookSerializer, view: :summary, many: true

  view :summary do |v|
    v.attributes :id, :name, :bio, :updated_at
  end

  view :detailed_with_basic_books do |v|
    v.attributes :id, :name, :bio, :updated_at

    v.association :books, view: :fully_detailed
  end
end
