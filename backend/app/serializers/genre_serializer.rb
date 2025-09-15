class GenreSerializer < ApplicationSerializer
  delegate :id, :name, to: :object

  view :summary do |v|
    v.attributes :id, :name
  end
end
