class AuthorSerializer < ApplicationSerializer
  delegate :id, :name, :updated_at, to: :object

  view :summary do |v|
    v.attributes :id, :name, :updated_at
  end
end
