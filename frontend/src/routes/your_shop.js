import { useEffect, useState } from "preact/hooks";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ButtonLink } from '../components/ButtonLink';
import { Button } from '../components/Button';
import { Input } from '../components/Inputs';
import { P, H1, H2 } from '../components/Typography';

import YourBooks from '../components/YourBooks';
import YourShelves from '../components/YourShelves';

import { useAuth } from '../contexts/AuthContext';

export default function YourShop() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState(null);

  // TODO: Implement an actual fucking tab switcher
  const [currentView, setCurrentView] = useState('books')

  useEffect(() => {
    const fetchShop = async () =>{
      setLoading(true);
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center">Carregando...</div>
        <Footer />
      </>
    );
  }

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

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row p-8 max-w-7xl mx-auto gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0 space-y-4">
          <H1 className="text-2xl font-bold mb-4">{shop.name}</H1>
          <P className="text-gray-600 mb-6">{shop.bio}</P>

          <Button
            className="w-full text-left"
            onClick={() => setCurrentView('books')}
            variant={currentView === 'books' ? 'default' : 'outline'}
            size="xl">
            Livros
          </Button>

          <Button
            onClick={() => setCurrentView('shelves')}
            className="w-full text-left"
            variant={currentView === 'shelves' ? 'default' : 'outline'}
            size="xl">
            Gerenciar estantes
          </Button>
        </aside>

        {currentView === 'books' && (
          <YourBooks shop={shop} />
        )}

        {currentView === 'shelves' && (
          <YourShelves shop={shop} />
        )}
      </div>
      <Footer />
    </>
  );
}

