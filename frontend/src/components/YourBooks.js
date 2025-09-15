import { useEffect, useState } from "preact/hooks";
import { useAuth } from '../contexts/AuthContext';

import { ButtonLink } from './ButtonLink';
import { Input } from './Inputs';
import { P, H1, H2 } from './Typography';

import BookCard from './BookCard'

const YourBooks = ({ shop, ...props }) => {
  const [books, setBooks] = useState([]);

  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // TODO: Move this into a single place, so we don't rewrite this
        // everytime
        const res = await fetch(`/api/internal/shops/${shop.id}/books`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const booksData = await res.json();

          setBooks(booksData.books || []);
        }
      } catch (err) {
        console.error("Failed to load shop", err);
      } finally {
        setLoading(false);
      }
    }

    if (token && shop) {
      fetchBooks();
    }
  }, [token, shop]);

  return (
    <main className="flex-1">
      <div className="flex items-center justify-between mb-3">
        <H1 className="">Seus Livros</H1>

        <ButtonLink
          to="/books/new"
          disabled={!shop.shelves?.length}>
          Adicionar novo livro
        </ButtonLink>
      </div>

      <Input className="mb-6" placeholder="Buscar livros..." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <P>Nenhum livro encontrado</P>
        )}
      </div>
    </main>
  )
}

export default YourBooks
