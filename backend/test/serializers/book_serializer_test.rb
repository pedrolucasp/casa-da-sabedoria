require "test_helper"

class BookSerializerTest < ActiveSupport::TestCase
  setup do
    @shop = create(:shop)
    @shelf = create(:shelf, shop: @shop)
    @publisher = create(:publisher)

    author1 = create(:author, name: "Author One")
    author2 = create(:author, name: "Author Two")
    genre1 = create(:genre, name: "Genre One")
    genre2 = create(:genre, name: "Genre Two")

    @book = create(
      :book,
      title: "Sample Book",
      description: "A sample book description.",
      year: 2023,
      publisher: @publisher,
      shelves: [@shelf],
      authors: [author1, author2],
      genres: [genre1, genre2]
    )
  end

  # TODO: Flesh other serialization scenarios
  test "serializes correct attributes and associations when using view for edit" do
    serializer = BookSerializer.new(@book, view: :edit)
    serialized_data = serializer.as_json

    assert_equal @book.id, serialized_data[:id]
    assert_equal "Sample Book", serialized_data[:title]
    assert_equal "A sample book description.", serialized_data[:description]
    assert_equal 2023, serialized_data[:year]
    assert_equal @publisher.id, serialized_data[:publisher][:id]
    assert_equal @shelf.id, serialized_data[:shelves].first[:id]
    assert_equal 2, serialized_data[:authors].size
    assert_equal 2, serialized_data[:genres].size
    assert_equal @book.updated_at.as_json, serialized_data[:updated_at].as_json

    # Check nested associations
    assert_equal 2, serialized_data[:authors].size
    assert_equal "Author One", serialized_data[:authors].first[:name]
    assert_equal 2, serialized_data[:genres].size
    assert_equal "Genre One", serialized_data[:genres].first[:name]
  end
end
