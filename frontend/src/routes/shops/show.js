import { useEffect, useState } from "preact/hooks"
import { Header, Footer, P, H1, H3 } from "../../components"
import { BookCard } from "../../components/Cards"

export default function Shop({ id }) {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch(`/api/v1/shops/${id}`);

        if (res.ok) {
          const data = await res.json();
          setShop(data.shop);
        }
      } catch (err) {
        console.error("Failed to load shop", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchShop()
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

  // Breadcrumbs here would be dope
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <H1 className="text-2xl font-bold mb-6">{shop.name}</H1>
            <P>{shop.bio} // {shop.location}</P>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            <H3>por {shop.user.name}</H3>
          </div>
        </div>

        {shop.shelves.map((shelf) => (
          <section key={`shelf-${shelf.id}`} id={`shelf-${shelf.id}`} className="mb-8">
            <h2 className="text-lg font-semibold mb-3">{shelf.name}</h2>
            {shelf.books && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {shelf.books.map((book) => (
                  <BookCard key={`book-card-${book.id}`} book={book} />
                ))}
              </div>
            )}

            {(!shelf.books || shelf.books.length === 0) && (
              <p className="text-gray-500">Nenhum livro nesta estante.</p>
            )}
          </section>
        ))}
      </div>
      <Footer />
    </>
  )
}
