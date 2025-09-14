import { useEffect, useState } from "preact/hooks";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/Button';
import { P, H1, H2 } from '../../components/Typography';
import { Input, TextArea } from '../../components/Inputs';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'preact-iso'

export default function New() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const { route } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/internal/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ shop: { name, bio, location } }),
      });
      if (res.ok) {
        route('/your_shop');
      } else {
        console.error("Failed to create shop");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div class="p-8 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Dê vida pro seu sebo</h1>
        <form onSubmit={handleSubmit} class="grid gap-4">
          <Input
            type="text"
            placeholder="Nome do sebo"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
          <TextArea
            placeholder="Descreve ele pra nós"
            value={bio}
            onInput={(e) => setBio(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Onde fica?"
            value={location}
            onInput={(e) => setLocation(e.target.value)}
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar sebo"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
