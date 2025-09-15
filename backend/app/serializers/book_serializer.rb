class BookSerializer < ApplicationSerializer
  delegate :id, :title, :updated_at, :year, to: :object

  association :authors, serializer: AuthorSerializer, view: :summary, many: true

  view :summary do |v|
    v.attributes :id, :title, :updated_at
  end

  view :detailed do |v|
    v.attributes :id, :title, :updated_at, :year
  end

  view :fully_detailed do |v|
    v.attributes :id, :title, :updated_at, :year, :cover_with_path
  end

  def cover_with_path
    Rails.application.routes.url_helpers
      .rails_blob_path(object.cover, only_path: true) if object.cover.attached?
  end
end
