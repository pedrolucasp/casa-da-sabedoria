import { BasicCard as Card } from '../components/Cards'
import { Header, Footer, Button, Input, P, H1, H2 } from '../components'

const Landing = () => (
  <>
    <Header />

    {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <H1 variant="hero">
          Descubra Tesouros Esquecidos
        </H1>
        <P>
          Um indexador de sebos — busque por título da obra, autor, ou editora.  
        </P>
        <div className="mt-6 flex w-full max-w-md">
          <Input placeholder="Busque por autor, título ou estante..." />
          <Button className="ml-2 bg-midnight hover:opacity-90">Buscar</Button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-t border-b border-neutral-200 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Card>
            <H2>12,450+</H2>
            <P>Livros indexados</P>
          </Card>
          <Card>
            <H2>4,200+</H2>
            <P>Autores listados</P>
          </Card>
          <Card>
            <H2>14,401+</H2>
            <P>Sebos cadastrados</P>
          </Card>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center space-y-4">
        <H2>Preservando conhecimento e trocas</H2>
        <P>

          Este projeto é dedicado para catalogar livros, sebos e editoras
          independentes que estariam em ouro momento, esquecido. O grande foco
          é garantir que livros que estão em sebos e estantes 
          consigam encontrar um novo dono.

        </P>
      </section>

    <Footer />
  </>
)

export default Landing
