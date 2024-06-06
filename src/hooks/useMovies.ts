import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce"; // Make sure to import your debounce hook
import { getMovies } from "../api/services/movies";
import { Movie } from "../api/models/Movie";
import { formatMovie } from "../helpers/formatMovie";

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  page: number;
  total: number;
  search: string;
  handleSearch: (value: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useMovies = (): UseMoviesReturn => {
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

  return {
    movies,
    loading,
    page,
    total,
    search,
    handleSearch,
    handleSearchChange,
    setPage,
  };
};
