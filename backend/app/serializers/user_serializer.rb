class UserSerializer < ApplicationSerializer
  delegate :id, :name, :email, :updated_at, to: :object

  view :summary do |v|
    v.attributes :id, :name, :email, :updated_at
  end
end
