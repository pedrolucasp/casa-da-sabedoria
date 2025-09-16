import { useEffect, useState } from "preact/hooks"
import { Header, Input, Button, Footer, H1 } from "../../components"
import { BookCard } from "../../components/Cards"
import { useLocation } from "preact-iso"

export default function Books() {
  const { query, route } = useLocation()
  const [q, setQ] = useState(query.q ?? "")
  const [search, setSearch] = useState(query.q ?? "")
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])

  const fetchBooks = async (term) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/v1/books?q=${encodeURIComponent(term)}`)

      if (res.ok) {
        const data = await res.json()
        setBooks(data.books)
      }
    } catch (err) {
      console.error("Failed to load shop", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (q !== "") {
      fetchBooks(q)
    } else {
      fetchBooks("")
    }
  }, [q])

  const onSearch = (e) => {
    e.preventDefault()

    route(`/books?q=${encodeURIComponent(search)}`, true)

    setQ(search)
  }

  return (
    <>
      <Header />
      <div className="flex flex-col p-8 max-w-7xl mx-auto gap-8">
        <header className="mb-6">
          <H1 className="text-2xl font-bold mb-6">Resultados da Busca</H1>

          <form onSubmit={onSearch} className="mt-4 flex gap-2">
            <Input
              value={search}
              onInput={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar livros, sebos, autores, gêneros..."
              className="p-3"
            />
            <Button type="submit">Buscar</Button>
          </form>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={`book-card-${book.id}`} book={book} />
          ))}
        </div>

        {(loading && (books.length === 0)) && (
          <p className="text-gray-500">Carregando...</p>
        )}

        {(!books || books.length === 0 && !loading) && (
          <p className="text-gray-500">Nenhum livro nesta estante.</p>
        )}
      </div>
      <Footer />
    </>
  )
}
