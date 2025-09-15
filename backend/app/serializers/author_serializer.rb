class AuthorSerializer < ApplicationSerializer
  delegate :id, :name, :bio, :updated_at, to: :object

  view :summary do |v|
    v.attributes :id, :name, :bio, :updated_at
  end
end
