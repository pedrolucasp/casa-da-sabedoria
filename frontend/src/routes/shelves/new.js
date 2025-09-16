import { useEffect, useState } from "preact/hooks";

import { Header, Footer, Button, Input, P, H1, H2 } from '../../components'

import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'preact-iso'

export default function New() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const { route } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/internal/shelves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shelf: { name } }),
      });

      if (res.ok) {
        route('/your_shop');
      } else {
        console.error("Failed to create shelf");
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
          <H1>Crie uma estante</H1>

          <P>
            Uma estante é como uma playlist, você organiza e adiciona os livros
            que quiser
          </P>
        </div>

        <form onSubmit={handleSubmit} class="grid gap-4">
          <Input
            type="text"
            placeholder="Nome da estante"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />

          <Button
            type="submit"
            size="lg"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar estante"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
