require "test_helper"

class AuthTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user, email: "james@casa.local")
  end

  test "user can sign in" do
    post user_session_path, params: {
      user: {
        email: @user.email,
        password: "password"
      }
    }

    assert_response :success
    assert_not_nil response.headers["Authorization"]
    assert json["user"]["email"], @user.email
  end

  test "user cannot sign in with bad credentials" do
    post user_session_path, params: {
      user: {
        email: @user.email,
        password: "badpassword"
      }
    }

    assert_response :unauthorized
    assert_nil response.headers["Authorization"]
    assert json["error"]
  end

  test "user can sign out" do
    # Sign in first to get the token
    post user_session_path, params: {
      user: {
        email: @user.email,
        password: "password"
      }
    }

    token = response.headers["Authorization"]
    assert_not_nil token

    # Now sign out
    delete destroy_user_session_path, headers: { "Authorization" => token }
    assert_response :success

    # TODO: move this shit outside?
    jti = JWT.decode(
      token.split(" ").last,
      Rails.application.credentials.devise_jwt_secret_key,
      true,
      algorithm: "HS256"
    )[0]["jti"]

    assert JwtDenylist.exists?(jti:)
  end
end
