# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

[
  "Ação",
  "Aventura",
  "Biografia",
  "Clássico",
  "Conto",
  "Crime",
  "Mistério",
  "Romance",
  "Não-ficção",
  "Fantasia",
  "Histórico",
  "Horror",
  "Infantil",
  "Juvenil",
  "Literatura LGBT",
  "Literatura Feminina",
  "Poesia",
  "Religião",
  "Ficção Científica",
  "Suspense",
  "Thriller",
  "Autoajuda",
  "Culinária",
  "Desenvolvimento Pessoal",
  "Ensaios",
  "Filosofia",
  "História",
  "Negócios",
  "Política",
  "Psicologia",
  "Sociologia",
  "Viagem"
].each do |genre_name|
  Genre.find_or_create_by!(name: genre_name)
end

[
  "J.K. Rowling",
  "George R.R. Martin",
  "J.R.R. Tolkien",
  "Agatha Christie",
  "Stephen King",
  "Isaac Asimov",
  "Arthur C. Clarke",
  "Mark Twain",
  "Jane Austen",
  "Charles Dickens",
  "Ernest Hemingway",
  "F. Scott Fitzgerald",
  "Leo Tolstoy",
  "Fyodor Dostoevsky",
  "Gabriel García Márquez",
  "Haruki Murakami",
  "Margaret Atwood",
  "Toni Morrison",
  "Virginia Woolf",
  "Oscar Wilde",
  "Franz Kafka",
  "H.P. Lovecraft",
  "Cormac McCarthy",
  "Neil Gaiman",
  "Suzanne Collins",
  "Rosa Luxemburg",
  "Leon Trotsky",
  "Karl Marx",
  "Friedrich Engels",
  "Simone de Beauvoir",
  "Michel Foucault",
  "Hannah Arendt"
].each do |author_name|
  Author.find_or_create_by!(name: author_name)
end

name_options = [
  "Alex",
  "Jordan",
  "Roberta",
  "Mariana",
  "Carlos",
  "Fernanda",
  "Lucas",
  "Ana",
  "Rafael",
  "Beatriz"
]

shop_names = [
  "Livraria do Alex",
  "Mundo dos Livros",
  "Cantinho da Leitura",
  "Páginas Encantadas",
  "Biblioteca do Saber",
  "Livros & Cia",
  "Estante Mágica",
  "Leitura Infinita",
  "Livraria do Saber",
  "Universo Literário"
]

bio_options = [
  "Apaixonado por livros e histórias.",
  "Compartilhando o amor pela leitura.",
  "Seu destino para aventuras literárias.",
  "Explorando mundos através das páginas.",
  "Onde cada livro é uma nova jornada.",
  "Descubra o poder das palavras.",
  "Transformando vidas, uma página de cada vez.",
  "Seu refúgio literário na cidade.",
  "Livros que inspiram e encantam.",
  "A magia da leitura começa aqui."
]

location_options = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Salvador, BA",
  "Recife, PE",
  "Xique-Xique, BA",
  "Fortaleza, CE",
  "Manaus, AM"
]

shelf_names = [
  "Clássicos da Literatura",
  "Descobertas Recentes",
  "Descontos 10%",
  "Ficção Científica e Fantasia",
  "Romances Imperdíveis",
  "Suspense e Mistério",
  "Teu avô leu",
  "Tu já viu na aula?",
  "Infantojuvenil",
  "Não-ficção e Biografias"
]

book_titles = [
  "O Senhor dos Anéis",
  "1984",
  "O Grande Gatsby",
  "Good Omens",
  "Cem Anos de Solidão",
  "O Código Da Vinci",
  "A Menina que Roubava Livros",
  "O Hobbit",
  "O Nome do Vento",
  "A Guerra dos Tronos",
  "O Caçador de Pipas",
  "A Culpa é das Estrelas",
  "O Alquimista",
  "O Diário de Anne Frank",
  "O Pequeno Príncipe",
  "A Revolução dos Bichos",
  "O Apanhador no Campo de Centeio",
  "O Silmarillion",
  "A Sombra do Vento",
  "O Morro dos Ventos Uivantes",
  "Olha os Lírios do Campo",
  "A Montanha Mágica",
  "O Processo",
  "A Metamorfose",
  "O Estrangeiro",
  "A Insustentável Leveza do Ser",
  "O Velho e o Mar",
  "A Letra Escarlate",
  "O Retrato de Dorian Gray",
  "A Divina Comédia",
  "O Livro dos Espíritos"
]

publisher_names = [
  "Penguin Random House",
  "HarperCollins",
  "Editora Record",
  "Companhia das Letras",
  "Editora Intrínseca",
  "Suma de Letras",
  "Editora Rocco",
  "Editora Expressão Popular",
  "Boitempo Editorial"
]

publisher_names.each do |publisher_name|
  Publisher.find_or_create_by!(name: publisher_name)
end

# XXX: Stole from other place
covers_path = Rails.root.join("vendor", "covers")
cover_files = Dir.children(covers_path).select { |f| f =~ /\.(jpg|jpeg|png)$/i }

puts "Publishers created or already existing."

40.times.each do |n|
  user = User.find_or_initialize_by(
    email: "pessoa#{n + 1}@casa.local",
    name: name_options.sample,
  )

  user.password = "password" if user.new_record?
  user.save! if user.changed?

  shop = Shop.find_or_create_by!(
    name: shop_names.sample,
    bio: bio_options.sample,
    location: location_options.sample,
    user: user
  )

  puts "User and Shop created or already existing."

  # Cria alguns livros e prateleiras para cada loja
  # Cada loja terá entre 5 e 15 livros e entre 2 e 5 prateleiras
  shelves = rand(2..6).times.map do
    Shelf.find_or_create_by!(
      name: shelf_names.sample,
      shop: shop
    )
  end

  puts "Shelves created or already existing."

  rand(5..15).times.each do
    book = Book.find_or_create_by!(
      title: book_titles.sample,
      description: "Descrição do livro #{book_titles.sample}: baita livro, vale a pena ler!",
      condition: [0, 1].sample,
      year: rand(1900..2023),
      publisher: Publisher.all.sample,
    )

    rand(1..3).times.each do
      book.authors << Author.all.sample unless book.authors.include?(Author.all.sample)
    end

    rand(1..3).times.each do
      book.genres << Genre.all.sample unless book.genres.include?(Genre.all.sample)
    end

    rand(1..3).times.each do
      shelf = shelves.sample
      book.shelves << shelf unless book.shelves.include?(shelf)
    end
  end
end

total_books = Book.count

# pick a random number of books to attach covers to (between half and all)
Book.all.order('RANDOM()').limit(rand((total_books / 2).ceil..(total_books))).each do |book|
  # pick a random cover file
  cover_file = cover_files.sample
  file_path  = covers_path.join(cover_file)

  # attach the cover to the book
  book.cover.attach(
    io: File.open(file_path),
    filename: cover_file,
    content_type: "image/#{File.extname(cover_file).delete('.')}"
  )

  puts "Attached #{cover_file} to #{book.title}"
end
