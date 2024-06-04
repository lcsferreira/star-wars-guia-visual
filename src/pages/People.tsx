import { useEffect, useState } from "react";
import { Character } from "../api/models/Character";
import { getCharacters } from "../api/services/characters";

import { Flex, Input, Pagination, Row, Spin } from "antd";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCard from "../components/CharacterCard";

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
    setLoading(true);
    const response = await getCharacters(page, debouncedSearch);
    setCharacters(response.results);
    setTotal(response.count);
    setLoading(false);
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
      <Search
        placeholder="Pesquisar por personagens"
        onSearch={handleSearch}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <Row justify="center">
        {loading && (
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        )}
        {!loading &&
          characters.map((character: Character) => (
            <CharacterCard key={character.url} {...character} />
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
