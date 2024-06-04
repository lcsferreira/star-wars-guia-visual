import { useEffect, useState } from "react";
import { Character } from "../api/models/Character";
import { getCharacters } from "../api/services/characters";
import Input from "antd/es/input";
import Row from "antd/es/row";
import Pagination from "antd/es/pagination";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCard from "../components/CharacterCard/index";
import { formatCharacter } from "../helpers/formatCharacter";
import { Header } from "antd/es/layout/layout";
import Button from "antd/es/button";

const { Search } = Input;

const People = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const loadCharacters = async (
    page: number,
    debouncedSearch: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await getCharacters(page, debouncedSearch);
      response.results.forEach((character: Character) => {
        formatCharacter(character);
      });
      setCharacters(response.results);
      setTotal(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearch(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          backgroundColor: "transparent",
        }}
      >
        <Button type="primary" href="/" color="primary">
          Voltar
        </Button>
        <Search
          placeholder="Pesquisar por personagens"
          onSearch={handleSearch}
          onChange={handleSearchChange}
        />
      </Header>
      <Row justify="center">
        {characters &&
          characters.map((character: Character) => (
            <CharacterCard
              key={character.url}
              character={character}
              loading={loading}
            />
          ))}
      </Row>
      <Pagination
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
        disabled={loading}
      />
    </div>
  );
};

export default People;
