require "test_helper"

class GenreSerializerTest < ActiveSupport::TestCase
  test "serializes genre with correct attributes" do
    genre = create(:genre, name: "Science Fiction")

    serializer = GenreSerializer.new(genre, view: :summary)
    serialized_data = serializer.as_json

    assert_equal genre.id, serialized_data[:id]
    assert_equal "Science Fiction", serialized_data[:name]
  end
end
