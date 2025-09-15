require "test_helper"

class AuthorSerializerTest < ActiveSupport::TestCase
  test "serializes author with correct attributes" do
    author = create(:author, name: "Pedro Pedras", bio: "An accomplished author.")

    serializer = AuthorSerializer.new(author, view: :summary)
    serialized_data = serializer.as_json

    assert_equal author.id, serialized_data[:id]
    assert_equal "Pedro Pedras", serialized_data[:name]
    assert_equal "An accomplished author.", serialized_data[:bio]
    assert_equal author.updated_at.as_json, serialized_data[:updated_at].as_json
  end
end
