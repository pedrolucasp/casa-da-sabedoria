FactoryBot.define do
  factory :shelf do
    name { "MyString" }

    association :shop
  end
end
