class ShopSerializer < ApplicationSerializer
  delegate :id, :name, :bio, :location, :updated_at, to: :object

  association :user, serializer: UserSerializer, view: :summary
  association :shelves, serializer: ShelfSerializer, view: :summary, many: true

  view :summary do |v|
    v.attributes :id, :name, :bio, :updated_at
  end

  view :detailed do |v|
    v.attributes :id, :name, :bio, :location, :updated_at

    v.association :shelves, view: :detailed_with_books
    v.association :user
  end
end
