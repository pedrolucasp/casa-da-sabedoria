require "test_helper"

class UserTest < ActiveSupport::TestCase
  setup do
    @user = build(:user)
  end

  test "valid user" do
    assert @user.valid?
  end

  test "invalid without email" do
    @user.email = nil

    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  test "invalid without password" do
    @user.password = nil

    assert_not @user.valid?
    assert_includes @user.errors[:password], "can't be blank"
  end

  test "invalid without name" do
    @user.name = nil

    assert_not @user.valid?
    assert_includes @user.errors[:name], "can't be blank"
  end

  test "email uniqueness" do
    create(:user, email: @user.email)

    assert_not @user.valid?
    assert_includes @user.errors[:email], "has already been taken"
  end
end
