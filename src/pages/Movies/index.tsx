import { Flex, Row, Spin } from "antd";
import { Movie } from "../../api/models/Movie";
import MovieCard from "../../components/Movies/MovieCard";
import { BackButton, Container, SearchBar, SearchInput } from "./style";
import Button from "antd/es/button";
import { PaginationContainer } from "../People/style";
import { useMovies } from "../../hooks/useMovies";

const Movies = () => {
  const {
    movies,
    loading,
    page,
    total,
    search,
    handleSearch,
    handleSearchChange,
    setPage,
  } = useMovies();

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
            <Spin size="large" data-testid="spinner" />
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
