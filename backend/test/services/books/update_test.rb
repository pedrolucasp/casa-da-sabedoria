require "test_helper"

class Books::UpdateTest < ActiveSupport::TestCase
  setup do
    @shop = create(:shop)
  end

  test "updates book basic details with valid params" do
    shelf = create(:shelf, shop: @shop)
    book = create(:book, shelves: [shelf], publisher: create(:publisher))

    params = {
      title: "Updated Title"
    }

    service = Books::Update.new(book, params)

    assert service.call
    assert_equal "Updated Title", book.reload.title

    # Ensure other attributes remain unchanged
    assert_equal book.authors, book.reload.authors
    assert_equal book.year, book.reload.year
  end

  test "does not update book with invalid params" do
    shelf = create(:shelf, shop: @shop)
    book = create(:book, shelves: [shelf], publisher: create(:publisher))

    params = {
      title: "" # Invalid title
    }

    service = Books::Update.new(book, params)

    refute service.call
    assert_includes book.errors[:title], "can't be blank"
    assert_not_equal "", book.reload.title
  end

  test "updates book associations with valid params" do
    shelf1 = create(:shelf, shop: @shop)
    shelf2 = create(:shelf, shop: @shop)

    author1 = create(:author)
    author2 = create(:author)

    genre1 = create(:genre)
    genre2 = create(:genre)

    publisher = create(:publisher)

    book = create(
      :book,
      shelves: [shelf1],
      authors: [author1],
      genres: [genre1],
      publisher: publisher
    )

    params = {
      shelf_ids: [shelf2.id],
      author_ids: [author2.id],
      genre_ids: [genre2.id]
    }

    service = Books::Update.new(book, params)

    assert service.call

    assert_equal [shelf2], book.reload.shelves
    assert_equal [author2], book.reload.authors
    assert_equal [genre2], book.reload.genres
  end

  test "handles non-existent associations gracefully" do
    shelf = create(:shelf, shop: @shop)
    author = create(:author)
    genre = create(:genre)
    publisher = create(:publisher)

    book = create(
      :book,
      shelves: [shelf],
      authors: [author],
      genres: [genre],
      publisher: publisher
    )

    params = {
      shelf_ids: [9999],  # Non-existent shelf ID
      author_ids: [9999], # Non-existent author ID
      genre_ids: [9999]   # Non-existent genre ID
    }

    service = Books::Update.new(book, params)
    assert service.call

    # Associations should be kept as the IDs do not exist
    assert_equal [shelf], book.reload.shelves
    assert_equal [author], book.reload.authors
    assert_equal [genre], book.reload.genres
  end
end
