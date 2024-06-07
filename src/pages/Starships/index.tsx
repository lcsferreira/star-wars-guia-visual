import { useEffect, useState } from "react";
import { Starship } from "../../api/models/Starship";
import { useDebounce } from "../../hooks/useDebounce";
import { getStarships } from "../../api/services/starships";
import {
  BackButton,
  Container,
  PaginationContainer,
  SearchBar,
  SearchInput,
} from "./style";
import { Button, Flex, Row, Spin } from "antd";
import StarshipCard from "../../components/Starships/StarshipCard";

const Starships = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const loadStarships = async (
    page: number,
    debouncedSearch: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await getStarships(page, debouncedSearch);
      setStarships(response.results);
      setTotal(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStarships(page, debouncedSearch);
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
          placeholder="Pesquisar por naves"
          allowClear
          enterButton
          onSearch={handleSearch}
          onChange={handleSearchChange}
        />
      </SearchBar>
      {loading && starships.length === 0 && (
        <Flex justify="center" align="center">
          <Spin size="large" />
        </Flex>
      )}
      {starships && (
        <Row gutter={[16, 16]}>
          {starships.map((starship) => (
            <StarshipCard
              key={starship.url}
              starship={starship}
              loading={loading}
            />
          ))}
        </Row>
      )}
      <PaginationContainer
        current={page}
        total={total}
        pageSize={10}
        onChange={(page) => setPage(page)}
        disabled={loading}
      />
    </Container>
  );
};

export default Starships;
