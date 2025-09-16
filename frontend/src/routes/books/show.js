import { useEffect, useState } from "preact/hooks"
import { Header, Footer, P, H1, H3 } from "../../components"
import { BookCard } from "../../components/Cards"

export default function BookPage({ id }) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/v1/books/${id}`)

        if (res.ok) {
          const data = await res.json()

          setBook(data.book)
        } else {
          console.error("Failed to load book", res.statusText)
          setBook(null)
        }
      } catch (err) {
        console.error("Failed to load book", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBook()
    }
  }, [id])

  // TODO: Generalize a loading state into a single component?
  if (loading) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
        <Footer />
      </>
    )
  }

  if (!book) {
    return (
      <>
        <Header />
        <img src="/not_found.gif" alt="Not found"
          className="max-w-xs mx-auto my-4" />
        <div className="p-8 text-center">Livro não encontrado.</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover */}
          <div className="w-full md:w-1/3">
            {book.cover_with_path ? (
              <img
                src={book.cover_with_path}
                alt={book.title}
                className="w-full rounded-lg shadow"
              />
            ) : (
              <div className="aspect-[2/3] flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                Sem capa
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <div className="text-sm text-gray-600 mb-4">
              {book.authors.map((a) => a.name).join(", ")}
            </div>

            <div>
              {book.description ? (
                <>
                  <P className="mb-6">{book.description}</P>
                </>
              ) : (
                <P className="text-gray-500 italic mb-6">Nenhuma descrição disponível.</P>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {book.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-2 py-1 rounded-full border"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {book.year && (
              <div className="text-sm text-gray-500">Publicado em {book.year}</div>
            )}

            <div className="text-sm text-gray-500">
              Adicionado em {new Date(book.created_at).toLocaleDateString()}
            </div>

            <div className="mt-6">
              <H3>Outras imagens desse livro:</H3>

                {book.photos_path && book.photos_path.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">

                    {book.photos_path.map((img, idx) => (
                      <div key={`book-image-${idx}`}
                           className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`Imagem ${idx + 1} de ${book.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                  </div>
                ) : (
                  <P className="text-gray-500 italic">Nenhuma imagem adicional disponível.</P>
                )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

