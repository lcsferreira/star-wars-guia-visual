import React, { useEffect, useState } from "react";
import { Flex, Input, Layout, Pagination, Row, Spin } from "antd";
import { useDebounce } from "../hooks/useDebounce";
import { getMovies } from "../api/services/movies";
import { Movie } from "../api/models/Movie";
import MovieCard from "../components/MovieCard";
const { Search } = Input;

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
    <Layout>
      <Search
        placeholder="Pesquisar por filmes"
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
          movies.map((movie: Movie) => (
            <MovieCard key={movie.url} {...movie} />
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
    </Layout>
  );
};

export default Movies;
