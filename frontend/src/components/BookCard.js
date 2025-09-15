import { Button } from './Button'

const BookCard = ({ book }) => {
  const coverUrl = book.cover_url || "/logo.svg";

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
        {book.title}
      </h3>

      <p className="text-xs text-gray-500 mb-2">{book.year || "Unknown year"}</p>

      <div class="flex gap-2 mt-auto">
        <Button
          type="button"
          variant="subtle"
          size="xs">
          Edit
        </Button>

        <Button
          type="button"
          variant="danger"
          size="xs">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BookCard
