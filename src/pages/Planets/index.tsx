import { useEffect, useState } from "react";
import { Planet } from "../../api/models/Planet";
import { useDebounce } from "../../hooks/useDebounce";
import { getPlanets } from "../../api/services/planets";
import {
  BackButton,
  Container,
  PaginationContainer,
  SearchBar,
  SearchInput,
} from "./style";
import { Button, Flex, Row, Spin } from "antd";
import PlanetCard from "../../components/Planets/PlanetCard";

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const loadPlanets = async (
    page: number,
    debouncedSearch: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await getPlanets(page, debouncedSearch);
      setPlanets(response.results);
      setTotal(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlanets(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPage(1);
    setSearch(e.target.value);
  };

  return (
    <Container>
      <SearchBar>
        <BackButton to="/">
          <Button type="primary" color="primary">
            Voltar
          </Button>
        </BackButton>
        <SearchInput
          placeholder="Pesquisar por personagens"
          onSearch={handleSearch}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <Row justify="center">
        {planets &&
          planets.map((planet: Planet) => (
            <PlanetCard key={planet.url} planet={planet} loading={loading} />
          ))}
        {loading && planets.length === 0 && (
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        )}
      </Row>
      <PaginationContainer
        current={page}
        total={total}
        pageSize={10}
        showSizeChanger={false}
        onChange={(page) => setPage(page)}
        disabled={loading}
      />
    </Container>
  );
};

export default Planets;
