import { useEffect, useState } from "preact/hooks";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/Button';
import { P, H1, H2, H3 } from '../../components/Typography';
import { Input, TextArea } from '../../components/Inputs';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'preact-iso'

import Select from 'react-select'
import CreatableSelect, { useCreatable } from 'react-select/creatable';

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState(0);
  const [shelves, setShelves] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedShelves, setSelectedShelves] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState();

  // Options data and shit
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  // For the whole page
  const [loading, setLoading] = useState(false);

  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [loadingPublishers, setLoadingPublishers] = useState(false);

  const { token } = useAuth();
  const { route } = useLocation();

  useEffect(() => {
    const fetchGenres = async () => {
      setLoadingGenres(true);

      try {
        const res = await fetch("/api/internal/genres", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();

          setGenres(
            data.genres.map((g) => ({ label: g.name, value: g.id }))
          );
        } else {
          console.error("Failed to fetch genres...");
        }
      } finally {
        setLoadingGenres(false);
      }
    }

    // TODO: We could just retrieve from the context?
    const fetchShelves = async () => {
      try {
        const res = await fetch("/api/internal/shelves/mine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();

          setShelves(
            data.shelves.map((s) => ({ label: s.name, value: s.id }))
          );
        } else {
          console.error("Failed to fetch user shelves...");
        }
      } finally {
        setLoading(false);
      }
    }

    const fetchAuthors = async () => {
      setLoadingAuthors(true);

      try {
        const res = await fetch("/api/internal/authors", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();

          setAuthors(
            data.authors.map((a) => ({ label: a.name, value: a.id }))
          );
        } else {
          console.error("Failed to fetch authors...");
        }
      } finally {
        setLoadingAuthors(false);
      }
    }

    // TODO: We could just retrieve from the context?
    const fetchPublishers = async () => {
      setLoadingPublishers(true);

      try {
        const res = await fetch("/api/internal/publishers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();

          setPublishers(
            data.publishers.map((p) => ({ label: p.name, value: p.id }))
          );
        } else {
          console.error("Failed to fetch publishers...");
        }
      } finally {
        setLoadingPublishers(false);
      }
    }

    if (token) {
      fetchShelves();
      fetchGenres();
      fetchAuthors();
      fetchPublishers();
    }
  }, [token]);

  const onCreateAuthor = async (inputString) => {
    setLoadingAuthors(true);

    try {
      const res = await fetch("/api/internal/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          author: { name: inputString }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newAuthor = { value: data.author.id, label: data.author.name };

        setAuthors(
          (prev) => [...prev, newAuthor]
        );

        setSelectedAuthors((prev) => [...prev, newAuthor])
      } else {
        console.error("Failed to create author");
      }
    } finally {
      setLoadingAuthors(false);
    }
  }

  const onCreateGenre = async (inputString) => {
    setLoadingGenres(true);

    try {
      const res = await fetch("/api/internal/genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          genre: { name: inputString }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newGenre = { value: data.genre.id, label: data.genre.name };

        setGenres(
          (prev) => [...prev, newGenre]
        );

        setSelectedGenres((prev) => [...prev, newGenre])
      } else {
        console.error("Failed to create genres");
      }
    } finally {
      setLoadingGenres(false);
    }
  }

  const onCreatePublisher = async (inputString) => {
    setLoadingPublishers(true);

    try {
      const res = await fetch("/api/internal/publishers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          publisher: { name: inputString }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newPublisher = { value: data.publisher.id, label: data.publisher.name };

        setPublishers(
          (prev) => [...prev, newPublisher]
        );

        setSelectedPublisher(newPublisher)
      } else {
        console.error("Failed to create publisher");
      }
    } finally {
      setLoadingPublishers(false);
    }
  }

  const handleSubmit = async (e) => {
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
            title,
            description,
            year,
            condition,
            publisher_id: selectedPublisher.value,
            shelf_ids: selectedShelves.map((s) => s.value),
            author_ids: selectedAuthors.map((a) => a.value),
            genre_ids: selectedGenres.map((g) => g.value)
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
            required="true"
            onInput={(e) => setTitle(e.target.value)}
          />

          <TextArea
            placeholder="Descrição do Livro"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Ano da Edição desse livro"
            value={year}
            maxlength="4"
            required="true"
            min={1}
            max={new Date().getFullYear()}
            onInput={(e) => setYear(e.target.value)}
          />

          <Select
            required="true"
            placeholder="Estante"
            isMulti
            onChange={(newValue) => setSelectedShelves(newValue)}
            value={selectedShelves}
            options={shelves} />

          <hr className="border-neutral-300" />

          <div className="mb-2">
            <H2>Informações do Livro</H2>

            <P>
              Aqui precisamos identificar mais dados que compõe o livro, para
              relacionar com outros dados para ser indexados
            </P>
          </div>

          <fieldset className="mb-1">
            <H3 className="mb-1">Autores</H3>

            <CreatableSelect
              required="true"
              placeholder="Autores"
              isMulti
              formatCreateLabel={(newValue) => `Criar autor "${newValue}"`}
              createOptionPosition="first"
              onCreateOption={onCreateAuthor}
              options={authors}
              isLoading={loadingAuthors}
              isDisabled={loadingAuthors}
              onChange={(newValue) => setSelectedAuthors(newValue)}
              value={selectedAuthors} />
          </fieldset>

          <fieldset className="mb-1">
            <H3 className="mb-1">Gêneros</H3>

            <CreatableSelect
              required="true"
              placeholder="Gêneros"
              isMulti
              formatCreateLabel={(newValue) => `Criar gênero "${newValue}"`}
              createOptionPosition="first"
              onCreateOption={onCreateGenre}
              options={genres}
              isLoading={loadingGenres}
              isDisabled={loadingGenres}
              onChange={(newValue) => setSelectedGenres(newValue)}
              value={selectedGenres} />
          </fieldset>

          <fieldset className="mb-1">
            <H3 className="mb-1">Editora</H3>

            <CreatableSelect
              isClearable
              required="true"
              placeholder="Editora"
              formatCreateLabel={(newValue) => `Criar editora "${newValue}"`}
              createOptionPosition="first"
              onCreateOption={onCreatePublisher}
              options={publishers}
              isLoading={loadingPublishers}
              isDisabled={loadingPublishers}
              onChange={(newValue) => setSelectedPublisher(newValue)}
              value={selectedPublisher} />
          </fieldset>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Adicionar Livro"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
