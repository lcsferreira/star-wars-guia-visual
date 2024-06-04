import { useEffect, useState } from "react";
import { Character } from "../api/models/Character";
import { getCharacters } from "../api/services/characters";

import { Input, Pagination, Row, Card } from "antd";
import Meta from "antd/es/card/Meta";
import SkeletonImage from "antd/es/skeleton/Image";
import { useDebounce } from "../hooks/useDebounce";

const { Search } = Input;

const People = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const loadCharacters = async (page: number) => {
    setLoading(true);
    const response = await getCharacters(page, debouncedSearch);
    setCharacters(response.results);
    setTotal(response.count);
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters(page);
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
        placeholder="Search characters"
        onSearch={handleSearch}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <Row justify="center">
        {characters.map((character: Character) => (
          <Card
            key={character.url}
            loading={loading}
            hoverable
            cover={
              loading ? (
                <SkeletonImage
                  active
                  style={{ width: 240, margin: "0 auto" }}
                />
              ) : (
                <img
                  alt="example"
                  src={`https://starwars-visualguide.com/assets/img/characters/${
                    character?.url?.match(/\d+/)?.[0]
                  }.jpg`}
                />
              )
            }
            style={{ width: 240, margin: "10px" }}
          >
            <Meta
              title={character.name}
              description={
                <div>
                  <p>Birth Year: {character.birth_year}</p>
                  <p>Eye Color: {character.eye_color}</p>
                  <p>Hair Color: {character.hair_color}</p>
                  <p>Height: {character.height}</p>
                  <p>Mass: {character.mass}</p>
                </div>
              }
            />
          </Card>
        ))}
      </Row>
      <Pagination
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default People;
