import React, { useEffect, useState } from "react";
import { Flex, Row, Spin } from "antd";
import { useDebounce } from "../../hooks/useDebounce";
import { getMovies } from "../../api/services/movies";
import { Movie } from "../../api/models/Movie";
import MovieCard from "../../components/Movies/MovieCard";
import { BackButton, Container, SearchBar, SearchInput } from "./style";
import Button from "antd/es/button";
import { PaginationContainer } from "../People/style";
import { formatMovie } from "../../helpers/formatMovie";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const loadMovies = async (
    page: number,
    debouncedSearch: string
  ): Promise<void> => {
    setLoading(true);
    const response = await getMovies(page, debouncedSearch);
    response.results = response.results.map((movie: Movie) =>
      formatMovie(movie)
    );
    setMovies(response.results);
    setTotal(response.count);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies(page, debouncedSearch);
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
    <Container>
      <SearchBar>
        <BackButton to="/">
          <Button type="primary" color="primary">
            Voltar
          </Button>
        </BackButton>
        <SearchInput
          placeholder="Pesquisar por filmes"
          onSearch={handleSearch}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <Row justify="center">
        {loading && movies.length === 0 && (
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        )}
        {movies &&
          movies.map((movie: Movie) => (
            <MovieCard key={movie.url} loading={loading} movie={movie} />
          ))}
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

export default Movies;
