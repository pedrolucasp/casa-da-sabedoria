import { useEffect, useState } from "preact/hooks";
import {
  Header,
  Footer,
  Button,
  Input,
  TextArea,
  ImageGallery,
  P,
  H1,
  H2,
  H3
} from '../../components';

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

  const [cover, setCover] = useState(null);
  const [photos, setPhotos] = useState([]);


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

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handlePhotosChange = (e) => {
    setPhotos([...photos, ...Array.from(e.target.files)]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("book[title]", title);
      formData.append("book[description]", description);
      formData.append("book[year]", year);
      formData.append("book[condition]", condition);

      if (selectedPublisher) {
        formData.append("book[publisher_id]", selectedPublisher.value);
      }

      for (const s of selectedShelves) {
        formData.append("book[shelf_ids][]", s.value)
      }

      for (const a of selectedAuthors) {
        formData.append("book[author_ids][]", a.value)
      }

      for (const g of selectedGenres) {
        formData.append("book[genre_ids][]", g.value)
      }

      if (cover) {
        formData.append("book[cover]", cover);
      }

      for (const p of photos) {
        formData.append("book[photos][]", p);
      }

      const res = await fetch("/api/internal/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        route("/your_shop");
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

        <form  onSubmit={handleSubmit} class="grid gap-4">
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

          <hr className="border-neutral-300" />

          <div className="mb-2">
            <H2>Imagens</H2>

            <P>
              Aqui precisamos identificar qual o estado do Livro
            </P>
          </div>

          <fieldset>
            <H3 class="mb-1">Capa</H3>

            <Input
              type="file"
              accept="image/*"
              id="cover"
              placeholder="Buscar"
              onChange={handleCoverChange}
            />

            <P className="mt-1 text-sm text-gray-500"
              id="cover">
              SVG, PNG, JPG.
            </P>

            {cover && (
              <div className="mt-2">
                <img alt="cover" src={URL.createObjectURL(cover)}
                     className="w-32 h-32 object-cover rounded" />

                <Button
                  className="mt-1"
                  variant="danger"
                  size="sm"
                  onClick={() => setCover(null)}
                >
                  Remover capa
                </Button>
              </div>
            )}
          </fieldset>

          <fieldset>
            <H3 class="mb-1">Fotos adicionais</H3>

            <input
              type="file"
              id="gallery"
              accept="image/*"
              multiple
              onChange={handlePhotosChange}
            />
            <P className="mt-1 text-sm text-gray-500"
              id="gallery">
              SVG, PNG, JPG.
            </P>

            <ImageGallery images={photos} onRemove={removePhoto} />
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
