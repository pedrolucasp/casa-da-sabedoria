require "test_helper"

class ShelfSerializerTest < ActiveSupport::TestCase
  setup do
    @shop = create(:shop, user: create(:user))

    @shelf = create(:shelf, name: "Favorites", shop: @shop)

    @genre1 = create(:genre, name: "Fantasy")
    @genre2 = create(:genre, name: "Sci-Fi")
    @genre3 = create(:genre, name: "Mystery")
    @genre4 = create(:genre, name: "Romance")

    publisher = create(:publisher)

    # Fantasy twice, Sci-Fi once
    book_1 = create(:book, publisher:, genres: [@genre1])
    book_2 = create(:book, publisher:, genres: [@genre1, @genre2])
    book_3 = create(:book, publisher:, genres: [@genre2, @genre4, @genre3])

    @shelf.books = [book_1, book_2, book_3]
  end

  test "serializes popular genres" do
    json = ShelfSerializer.new(@shelf, view: :detailed).as_json

    assert_equal "Favorites", json[:name]
    assert_includes json[:popular_genres], "Fantasy"
    assert_includes json[:popular_genres], "Sci-Fi"
    assert_includes json[:popular_genres], "Mystery"

    assert_equal 3, json[:popular_genres].size
  end

  test "serialize object" do
    json = ShelfSerializer.new(@shelf, view: :detailed).as_json

    assert_equal [
      :id,
      :name,
      :updated_at,
      :popular_genres,
      :books_count
    ], json.keys
  end
end
