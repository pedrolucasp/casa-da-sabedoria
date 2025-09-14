FactoryBot.define do
  factory :book do
    title { "O Estrangeiro" }
    description { "Esse livro me desgraçou" }
    year { 1942 }
    status { 1 }
    publisher { nil }
  end
end
