import { useEffect, useState } from "preact/hooks";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/Button';
import { P, H1, H2 } from '../../components/Typography';
import { Input, TextArea } from '../../components/Inputs';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'preact-iso'

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState(0);
  const [shelves, setShelves] = useState([]);

  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/internal/genres", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();

          setGenres(data.genres);
        } else {
          console.error("Failed to fetch genres...");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/internal/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          book: {
            name,
            description,
            year,
            condition,
            shelves
          }
        })
      });

      if (res.ok) {
        route('/your_shop');
      } else {
        console.error("Failed to create book");
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
          <H1>Adicione um Livro</H1>

          <P>
            Uma estante é como uma playlist, você organiza e adiciona os livros
            que quiser
          </P>
        </div>

        <form onSubmit={handleSubmit} class="grid gap-4">
          <Input
            type="text"
            placeholder="Título do Livro"
            value={title}
            onInput={(e) => setTitle(e.target.value)}
          />

          <Button
            type="submit"
            size="lg"
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Adicionando livro"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
