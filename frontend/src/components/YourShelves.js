import { useEffect, useState } from "preact/hooks";

import { Button } from './Button';
import { ButtonLink } from './ButtonLink';
import { P, H1 } from './Typography';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'preact-iso';

const YourShelves = ({ shop, ...props }) => {
  const { token } = useAuth();
  const { route } = useLocation();

  const [shelves, setShelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchShelves() {
      setLoading(true);
      try {
        const res = await fetch('/api/internal/shelves', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setShelves(data.shelves || []);
        }
      } catch (err) {
        console.error("Failed to load shelves", err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchShelves();
  }, [token]);

  async function handleDelete(shelfId) {
    if (!confirm("Tem certeza que deseja deletar esta estante?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/internal/shelves/${shelfId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setShelves(shelves.filter(s => s.id !== shelfId));
      } else {
        console.error("Failed to delete shelf");
      }
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <>
      <main className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <H1 className="">Suas Estantes</H1>

          <ButtonLink
            to="/books/new"
            disabled={!shop.shelves?.length}>
            Adicionar nova estante
          </ButtonLink>
        </div>

          {shelves.length === 0 ? (
            <P>Nenhuma estante encontrada</P>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Qtd. livros</th>
                    <th className="px-4 py-2 text-left">Gêneros</th>
                    <th className="px-4 py-2 text-left">Última atualização</th>
                    <th className="px-4 py-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shelves.map((shelf) => (
                    <tr key={shelf.id}>
                      <td className="px-4 py-2">{shelf.name}</td>
                      <td className="px-4 py-2">{shelf.books_count}</td>
                      <td className="px-4 py-2">{shelf.popular_genres.join(", ")}</td>
                      <td className="px-4 py-2">{new Date(shelf.updated_at).toLocaleDateString()}</td>
                      <td className="px-4 py-2 flex gap-2 justify-end">
                        <Button
                          variant="subtle"
                          size="sm"
                          onClick={() => route(`/your_shop/shelves/${shelf.id}/edit`)}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          disabled={(shelf.books_count > 0 || deleting)}
                          onClick={() => handleDelete(shelf.id)}
                        >
                          {deleting ? "Deletando..." : "Deletar"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </main>
    </>
  );
}

export default YourShelves;
