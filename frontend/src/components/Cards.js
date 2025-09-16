import { cn } from '../lib/utils'

const BasicCard = ({ children, className }) => {
  return (
    <div className={cn("rounded-xl border border-neutral-200 bg-white p-4", className)}>
      {children}
    </div>
  )
}

const BookCard = ({ book }) => {
  return (
    <a href={`/books/${book.id}`} className="block group">
      <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden mb-2">
        {book.cover_with_path ? (
          <img src={book.cover_with_path} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
            Sem capa
          </div>
        )}
      </div>
      <div className="text-sm font-medium leading-tight">{book.title}</div>
      <div className="text-xs text-gray-600">{book.authors.map(a => a.name).join(', ')}</div>
      <div className="mt-1 flex flex-wrap gap-1">
        {book.genres?.slice(0,3).map(g => (
          <span key={g.id} className="text-xs px-2 py-0.5 rounded-full border">{g.name}</span>
        ))}
      </div>
    </a>
  )
}


const ShopCard = ({ shop }) => {
  return (
    <a href={`/shops/${shop.id}`} className="block p-4 border rounded-md hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div>
          <div className="font-semibold">{shop.name}</div>
          <div className="text-sm text-gray-600">{shop.bio}</div>
        </div>
      </div>
    </a>
  )
}

export {
  BasicCard,
  BookCard,
  ShopCard
}
