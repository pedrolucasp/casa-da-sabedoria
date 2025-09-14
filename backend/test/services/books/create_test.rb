require "test_helper"

class Books::CreateTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @shop = create(:shop, user: @user)
    @authors = [
      create(:author),
      create(:author)
    ]
    @shelves = [
      create(:shelf, shop: @shop),
      create(:shelf, shop: @shop)
    ]
    @publisher = create(:publisher)
    @genres = [create(:genre)]
  end

  test "successfully creates a book with valid params" do
    service = Books::Create.new(
      params: {
        title: "Test Book",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: publisher.id,
        author_ids: authors.map(&:id),
        shelf_ids: shelves.map(&:id),
        genre_ids: genres.map(&:id)
      },
      user: @user
    )

    assert service.valid?
    assert service.call, "Service should succeed"
    assert service.book.persisted?

    assert_equal "Test Book", service.book.title
    assert_equal @publisher, service.book.publisher
    assert_equal 2, service.book.authors.count
    assert_equal 1, service.book.genres.count
  end

  test "fails if user is missing" do
    service = Books::Create.new(
      params: { title: "Book without user" },
      user: nil
    )

    refute service.call, "Service should fail"
    assert_nil service.user
  end

  test "fails if title is blank" do
    service = Books::Create.new(
      params: {
        title: "",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: publisher.id,
        author_ids: authors.map(&:id),
        shelf_ids: shelves.map(&:id),
        genre_ids: genres.map(&:id)
      },
      user: @user
    )

    refute service.call, "Service should fail"
    assert_includes service.errors.full_messages, "Title can't be blank"
  end

  test "fails if publisher is blank" do
    service = Books::Create.new(
      params: {
        title: "Desespero",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: nil,
        author_ids: authors.map(&:id),
        shelf_ids: shelves.map(&:id),
        genre_ids: genres.map(&:id)
      },
      user: @user
    )

    refute service.call, "Service should fail"
    assert_includes service.errors.full_messages, "Publisher can't be blank"
  end

  test "fails if genres are empty" do
    service = Books::Create.new(
      params: {
        title: "Desespero",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: publisher.id,
        author_ids: authors.map(&:id),
        shelf_ids: shelves.map(&:id),
        genre_ids: []
      },
      user: @user
    )

    refute service.call, "Service should fail"
    assert_includes service.errors.full_messages, "Genre ids can't be blank"
  end

  test "fails if authors are empty" do
    service = Books::Create.new(
      params: {
        title: "Desespero",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: publisher.id,
        author_ids: [],
        shelf_ids: shelves.map(&:id),
        genre_ids: genres.map(&:id)
      },
      user: @user
    )

    refute service.call, "Service should fail"
    assert_includes service.errors.full_messages, "Author ids can't be blank"
  end

  test "fails if shelves are empty" do
    service = Books::Create.new(
      params: {
        title: "Desespero",
        description: "A neat description",
        year: Date.new(2020, 1, 1),
        publisher_id: publisher.id,
        author_ids: authors.map(&:id),
        shelf_ids: [],
        genre_ids: genres.map(&:id)
      },
      user: @user
    )

    refute service.call, "Service should fail"
    assert_includes service.errors.full_messages, "Shelf ids can't be blank"
  end

  private

  def shelves
    @shelves
  end

  def authors
    @authors
  end

  def publisher
    @publisher
  end

  def genres
    @genres
  end
end
