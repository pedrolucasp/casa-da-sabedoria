import { useState, useEffect } from 'preact/hooks';
import { Header, Footer, Button, Input } from '../components';
import { BookCard, ShopCard } from '../components/Cards';

const Explore = () => {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState([])
  const [featuredShops, setFeaturedShops] = useState([])
  const [genres, setGenres] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [exploreRes, genresRes] = await Promise.all([
          fetch('/api/v1/explore'),
          fetch('/api/v1/genres')
        ]);

        const [exploreJson, genresJson] = await Promise.all([
          exploreRes.json(),
          genresRes.json()
        ]);

        setTrending(exploreJson.trending_books || []);
        setFeaturedShops(exploreJson.featured_shops || []);
        setGenres(genresJson.genres || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e) => {
    e.preventDefault()

    // TODO: rig this crap up with a simple navigate and let rails do the dirty
    // work
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <>
      <Header />
      <div className="flex flex-col p-8 max-w-7xl mx-auto gap-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Explorar</h1>
          <p className="text-gray-600">Descubra livros, estantes e sebos.</p>

          <form onSubmit={onSearch} className="mt-4 flex gap-2">
            <Input
              value={query}
              onInput={e => setQuery(e.target.value)}
              placeholder="Pesquisar livros, sebos, autores, gêneros..."
              className="p-3" />

            <Button>Buscar</Button>
          </form>
        </header>

        {/* Shit'll be big bro */}
        {loading ? <Loading /> : (
          <main class="space-y-8">
            <section>
              <h2 class="text-2xl font-semibold mb-3">Em alta</h2>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {trending.map(b => <BookCard key={`trending-book-card-${b.id}`} book={b} />)}
              </div>
            </section>

            {/* Featured shops */}
            <section>
              <h2 class="text-2xl font-semibold mb-3">Sebos em destaque</h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featuredShops.map(s => <ShopCard key={`featured-${s.id}`} shop={s} />)}
              </div>
            </section>

            {/* Genres */}
            <section>
              <h2 class="text-2xl font-semibold mb-3">Explorar por gênero</h2>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {genres.map(g => (
                  <a key={`genre-${g.id}`} href={`/genres/${g.id}`} class="p-4 border rounded-md text-center">
                    {g.name}
                  </a>
                ))}
              </div>
            </section>

            <CuratedShelves />
          </main>
        )}
      </div>
      <Footer />
    </>
  );
}

const Loading = () => (
  <div class="p-8 text-center">Carregando...</div>
);

const CuratedShelves = () => {
  const [shelves, setShelves] = useState(null)

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const res = await fetch('/api/v1/shelves/curated')

        if (res.ok) {
          const data = await res.json()

          setShelves(data.shelves || [])
        } else {
          console.error("Failed to load curated shelves", res.statusText)
          setShelves([])
        }
      } catch (err) {
        console.error("Failed to load curated shelves", err);
      }
    }

    fetchShelves()
  }, []);

  if (!shelves) {
    return <Loading />
  }

  if (shelves.length === 0) {
    return null
  }

  return (
    <section>
      <h2 class="text-2xl font-semibold mb-3">Prateleiras selecionadas</h2>
      <div class="space-y-6">
        {shelves.map(s => (
          <div key={`curated-shelf-${s.id}`} class="border rounded-md p-4">
            <div class="flex items-center justify-between mb-3">

              <div>
                <div class="font-semibold">{s.name}</div>
                <div class="text-sm text-gray-600">por&nbsp;
                  <a href={`/shops/${s.shop.id}`}>
                    {s.shop.name}
                  </a>
                </div>
              </div>

              <a href={`/shops/${s.shop.id}#shelf-${s.id}`}
                 class="text-sm underline">
                Ver prateleira
              </a>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {s.books.slice(0, 6).map(b => (
                <BookCard key={`curated-shelf-book-card-${b.id}`} book={b} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Explore;
