FactoryBot.define do
  factory :shop do
    name { "Beco do Diabo" }
    location { "Pelotas, RS" }
    bio { "Beco onde encontram os piores livros" }

    association :user
  end
end
