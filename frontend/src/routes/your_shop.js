import { useEffect, useState } from "preact/hooks";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ButtonLink } from '../components/ButtonLink';
import { P, H1, H2 } from '../components/Typography';
import { useAuth } from '../contexts/AuthContext';

export default function YourShop() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState(null);


  useEffect(() => {
    async function fetchShop() {
      try {
        // TODO: Move this into a single place, so we don't rewrite this
        // everytime
        const res = await fetch("/api/internal/shops/mine", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();

          setShop(data?.shop);
        }
      } catch (err) {
        console.error("Failed to load shop", err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchShop();
    }
  }, [token]);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  if (!shop) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <H2 className="text-xl font-semibold">Você não tem um sebo ainda</H2>
          <P className="text-gray-500">
            Organize a sua para começar a criar suas estantes e vender seus livros
          </P>
          <ButtonLink
            to="/shops/new"
            size="lg"
          >
            Criar sebo
          </ButtonLink>
        </div>
        <Footer />
      </>
    );
  }

  // The hub. Maybe we need to rework this into a better thing?
  return (
    <>
      <Header />
      <div className="p-8 max-w-3xl mx-auto">
        <H1 className="text-2xl font-bold mb-4">{shop.name}</H1>
        <P className="text-gray-600 mb-6">{shop.bio}</P>

        <div className="grid gap-4 mt-6">
          <ButtonLink
            to="/shelves/new"
            variant="outline"
            size="xl"
          >
            Adicionar uma nova estante
          </ButtonLink>

          <ButtonLink
            to="/books/new"
            variant="outline"
            size="xl"
            disabled={!shop.shelves?.length}
          >
            Adicionar novo livro
          </ButtonLink>

          <ButtonLink
            to={`/shops/${shop.id}/shelves`}
            variant="outline"
            size="xl"
          >
            Gerenciar estantes
          </ButtonLink>

          <ButtonLink
            to={`/shops/${shop.id}/books`}
            variant="outline"
            size="xl"
            disabled={!shop.shelves?.length}
          >
            Gerenciar livros
          </ButtonLink>
        </div>
      </div>
      <Footer />
    </>
  );
}

