import { useEffect, useState } from "preact/hooks";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Button } from '../../components/Button';
import { P, H1 } from '../../components/Typography';
import { Input } from '../../components/Inputs';
import { useAuth } from '../../contexts/AuthContext';

import { useLocation } from 'preact-iso';

export default function Edit({ id }) {
  const [shelf, setShelf] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    const fetchShelf = async() => {
      try {
        const res = await fetch(`/api/internal/shelves/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();

          setShelf(data);
          setName(data.name);
        }
      } catch (err) {
        console.error("Error when loading shelf", err);
      } finally {
        setLoading(false);
      }
    }

    if (id && token) {
      fetchShelf();
    }
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/internal/shelves/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shelf: { name } }),
      });

      if (res.ok) {
        route('/your_shop');
      } else {
        console.error("Failed to patch shelf");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div class="p-8 max-w-xl mx-auto">
        <div className="mb-4">
          <H1>Editar estante</H1>
          <P>Altere o nome da sua estante abaixo:</P>
        </div>

        <form onSubmit={handleSubmit} class="grid gap-4">
          <Input
            type="text"
            placeholder="Nome da estante"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />

          <hr className="border-gray-300" />

          <div className="">
            Essa estante possui os seguintes livros:

            {shelf && shelf.books.map((b) => (
              <P className="mb-1">
                {b.authors.map((a) => a.name).join(', ')} — {b.title} ({b.year})
              </P>
            ))}
          </div>

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}

