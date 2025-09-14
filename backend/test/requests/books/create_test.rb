require "test_helper"

class Api::Internal::BooksCreateTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user)
    @shop = create(:shop, user: @user)
    @shelf = create(:shelf, shop: @shop)
    @author = create(:author)
    @publisher = create(:publisher)
    @genre = create(:genre)

    @auth_headers = Devise::JWT::TestHelpers.auth_headers({}, @user)
  end

  test "should create book" do
    assert_difference("Book.count", 1) do
      post api_internal_books_path, params: {
        book: {
          title: "New Book",
          description: "Cool description",
          year: 2021,
          author_ids: [@author.id],
          publisher_id: @publisher.id,
          genre_ids: [@genre.id],
          shelf_ids: [@shelf.id]
        }
      },
      headers: @auth_headers
    end

    assert_response :created
  end

  test "should not create invalid book" do
    assert_no_difference("Book.count") do
      post api_internal_books_path, params: {
        book: { shop_id: @shop.id, title: "" }
      }, headers: @auth_headers
    end

    assert_response :unprocessable_content
  end
end
