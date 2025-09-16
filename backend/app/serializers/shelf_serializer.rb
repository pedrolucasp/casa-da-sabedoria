class ShelfSerializer < ApplicationSerializer
  delegate :id, :name, :updated_at, :popular_genres, to: :object

  association :shop, serializer: ShopSerializer, view: :summary
  association :books, serializer: BookSerializer, view: :summary, many: true

  view :summary do |v|
    v.attributes :id, :name, :updated_at
  end

  view :detailed do |v|
    v.attributes :id, :name, :updated_at, :popular_genres, :books_count
  end

  view :detailed_with_shop do |v|
    v.attributes :id, :name, :updated_at

    v.association :shop, view: :summary
    v.association :books, view: :fully_detailed
  end

  view :with_books do |v|
    v.attributes :id, :name, :updated_at
    v.association :books, view: :detailed
  end

  view :detailed_with_books do |v|
    v.attributes :id, :name, :updated_at

    v.association :books, view: :fully_detailed
  end

  def books_count
    object.books.count
  end
end
