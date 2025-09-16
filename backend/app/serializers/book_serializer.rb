# TODO: Urgently need to pick a couple of styles here, since this is a mess
# right now. For example, we need to always display the cover, except for
# summary, since it is the simplest view.

class BookSerializer < ApplicationSerializer
  delegate :id,
    :title,
    :description,
    :condition,
    :created_at,
    :updated_at,
    :year,
    :shelf_ids,
    :photos, to: :object

  association :authors, serializer: AuthorSerializer, view: :summary, many: true
  association :publisher, serializer: PublisherSerializer, view: :summary
  association :genres, serializer: GenreSerializer, view: :summary, many: true
  association :shelves, serializer: ShelfSerializer, view: :summary, many: true

  view :summary do |v|
    v.attributes :id, :title, :updated_at
  end

  view :detailed do |v|
    v.attributes :id, :title, :updated_at, :year, :cover_with_path
  end

  view :fully_detailed do |v|
    v.attributes :id, :title, :description, :created_at, :updated_at, :year, :cover_with_path

    v.association :authors, view: :summary
    v.association :genres, view: :summary
  end

  view :show do |v|
    v.attributes :id, :title, :description, :created_at, :updated_at, :year, :photos_path, :cover_with_path

    v.association :authors, view: :detailed_with_basic_books
    v.association :genres, view: :summary
  end

  view :edit do |v|
    v.attributes :id, :title, :description, :year, :cover_with_path, :photos_path, :updated_at

    v.association :publisher, view: :summary
    v.association :shelves, view: :summary
    v.association :genres, view: :summary
    v.association :authors, view: :summary
  end

  def photos_path
    object.photos.map do |photo|
      Rails.application.routes.url_helpers
        .rails_blob_path(photo, only_path: true)
    end
  end

  def cover_with_path
    Rails.application.routes.url_helpers
      .rails_blob_path(object.cover, only_path: true) if object.cover.attached?
  end
end
