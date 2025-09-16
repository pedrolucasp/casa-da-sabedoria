class ShopSerializer < ApplicationSerializer
  delegate :id, :name, :bio, :location, :updated_at, to: :object

  view :summary do |v|
    v.attributes :id, :name, :bio, :updated_at
  end
end
