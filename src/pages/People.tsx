import { useEffect, useState } from "react";
import { Character } from "../api/models/Character";
import { getCharacters } from "../api/services/characters";

import { Input, Table, Pagination, Row, Card } from "antd";
import Meta from "antd/es/card/Meta";
import SkeletonImage from "antd/es/skeleton/Image";
import { useDebounce } from "../hooks/useDebounce";

const { Search } = Input;

const People = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
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

  return (
    <div style={{ padding: "20px" }}>
      <Search
        placeholder="Search characters"
        onSearch={handleSearch}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Row justify="center">
        {characters.map((character: Character) => (
          <Card
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
        onChange={(page) => setPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default People;
