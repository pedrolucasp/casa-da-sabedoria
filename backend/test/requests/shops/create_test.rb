require "test_helper"

class Api::Internal::ShopsCreateTest < ActionDispatch::IntegrationTest
  # TODO: Flesh policies tests here as well

  setup do
    @user = create(:user)

    @auth_headers = Devise::JWT::TestHelpers.auth_headers({}, @user)
  end

  test "user can create a new shop" do
    params = {
      shop: {
        name: "Casa do Bem Viver",
        bio: "Um sebo localizado na Dom Pedro II",
        location: "Pelotas, Brasil"
      }
    }

    post api_internal_shops_path, params:, headers: @auth_headers

    assert_response :success
    assert_equal "Casa do Bem Viver", json["shop"]["name"]
    assert_equal "Um sebo localizado na Dom Pedro II", json["shop"]["bio"]
    assert_equal "Pelotas, Brasil", json["shop"]["location"]
    assert_equal @user.id, json["shop"]["user_id"]
  end
end
