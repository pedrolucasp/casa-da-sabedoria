class Api::Internal::InternalShelfTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user)
    @shop = create(:shop, user: @user)
    @shelf = create(:shelf, shop: @shop, name: "Degenerated")

    @auth_headers = Devise::JWT::TestHelpers.auth_headers({}, @user)
  end

  test "should get index" do
    create(:shelf, name: "Another heart", shop: @shop)

    get api_internal_shelves_path, as: :json, headers: @auth_headers

    assert_response :success

    assert_equal 2, json["shelves"].count
    assert_equal ["Another heart", "Degenerated"], json["shelves"].map { it["name"] }
  end

  test "should destroy shelf" do
    assert_difference("Shelf.count", -1) do
      delete api_internal_shelf_path(@shelf), as: :json, headers: @auth_headers
    end

    assert_response :no_content
  end
end
