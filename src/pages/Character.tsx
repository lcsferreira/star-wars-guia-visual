import { useParams } from "react-router-dom";
import { getCharacter } from "../api/services/characters";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import type { Character } from "../api/models/Character";
import { Layout, Spin } from "antd";
import Card from "antd/es/card/Card";
import { formatCharacter } from "../helpers/formatCharacter";
import CharacterDetail from "../components/CharacterDetail";
import MovieCarousel from "../components/MovieCarousel";

const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const loadCharacter = async (id: string) => {
    try {
      setLoading(true);
      const characterData = await getCharacter(id);
      const formattedCharacter = await formatCharacter(characterData);

      setCharacter(formattedCharacter);
    } catch (error) {
      setError("Erro ao carregar personagem");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  if (error) {
    return (
      <Layout>
        <Content style={{ display: "flex", justifyContent: "center" }}>
          <Card title="Erro" style={{ width: "50%" }}>
            <p>{error}</p>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
        {loading && <Spin size="large" />}
        {character && id && (
          <CharacterDetail
            character={character}
            loading={loading}
            characterId={id}
          />
        )}
        {character && id && (
          <MovieCarousel loading={loading} filmsUrls={character.films} />
        )}
      </Content>
    </Layout>
  );
};

export default CharacterDetails;
