class PublisherSerializer < ApplicationSerializer
  delegate :id, :name, :created_at, :updated_at, to: :object

  view :summary do |v|
    v.attributes :id, :name
  end

  view :detailed do |v|
    v.attributes :id, :name, :created_at, :updated_at
  end
end
