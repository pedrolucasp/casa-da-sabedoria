import { Button } from './Button'
import { ButtonLink } from './ButtonLink'

// TODO: Might go ahead and unify this with BookCard in explore.js later
const BookCard = ({ book, onDelete }) => {
  const coverUrl = book.cover_with_path;

  return (
    <div className="group bg-white rounded-md shadow-sm hover:shadow transition p-2 flex flex-col">
      <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden mb-2">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
            Sem capa
          </div>
        )}
      </div>

      <div className="text-sm font-medium leading-tight">{book.title}</div>

      <div className="text-xs text-gray-600">{book.authors.map(a => a.name).join(', ')}</div>

      <div className="text-xs text-gray-500 mb-2">
        {book.year || "Ano desconhecido"}
      </div>

      <div className="flex gap-2 mt-auto">
        <ButtonLink
          to={`/books/${book.id}/edit`}
          variant="subtle"
          size="xs"
        >
          Editar
        </ButtonLink>

        <Button
          type="button"
          variant="danger"
          onClick={() => onDelete(book.id)}
          size="xs"
        >
          Deletar
        </Button>
      </div>
    </div>
  )
}

export default BookCard
