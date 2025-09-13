require "test_helper"

class UsersMeTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user, email: "hetfield@casa.local")
  end

  test "user can grab information about themselves" do
    post user_session_path, params: {
      user: {
        email: @user.email,
        password: "password"
      }
    }

    assert_response :success
    assert_not_nil response.headers["Authorization"]
    token = response.headers["Authorization"]

    get me_api_internal_users_path, headers: { "Authorization" => token }

    assert_response :ok
    assert_equal @user.email, json["email"]
  end

  test "user cannot grab information about themselves when not logged in" do
    get me_api_internal_users_path(format: :json)

    assert_response :unauthorized
    assert_equal(I18n.t(:'devise.failure.unauthenticated'), json["error"])
  end

  test "user cannot grab information about themselves with invalid token" do
    post user_session_path, params: {
      user: {
        email: @user.email,
        password: "password"
      }
    }

    assert_response :success
    assert_not_nil response.headers["Authorization"]
    token = response.headers["Authorization"] + "invalid"

    get me_api_internal_users_path, headers: { "Authorization" => token }
    assert_response :unauthorized
  end
end
