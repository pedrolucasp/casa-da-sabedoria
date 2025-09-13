FactoryBot.define do
  factory :user do
    name { "Mac DeMarco" }
    sequence(:email) { |n| "person#{n}@casa.local" }
    password { "password" }
  end
end
