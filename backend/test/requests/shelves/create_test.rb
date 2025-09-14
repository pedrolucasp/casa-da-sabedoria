require "test_helper"

class Api::Internal::ShelfCreateTest < ActionDispatch::IntegrationTest
  # TODO: Flesh policies tests here as well

  setup do
    @user = create(:user)
    @shop = create(:shop, user: @user)

    @auth_headers = Devise::JWT::TestHelpers.auth_headers({}, @user)
  end

  test "user can create a new shelf for their shop" do
    params = {
      shelf: { name: "Horror" }
    }

    post api_internal_shelves_path, params:, headers: @auth_headers

    assert_response :success
    assert_equal "Horror", json["shelf"]["name"]
    assert_equal @shop.id, json["shelf"]["shop_id"]
  end
end
