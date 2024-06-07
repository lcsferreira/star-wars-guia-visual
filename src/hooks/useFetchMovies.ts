import { useCallback, useEffect, useState } from "react";
import { Movie } from "../api/models/Movie";
import { getMovie } from "../api/services/movies";

const useFetchMovies = (filmsUrls: string[]) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);

  const getAllMovies = useCallback(async (): Promise<Movie[]> => {
    const moviesData = await Promise.all(
      filmsUrls.map(async (url: string): Promise<Movie> => {
        const movieId = url.match(/\d+/)?.[0]; // Add a null check before accessing the first element
        if (movieId) {
          return await getMovie(movieId);
        }
        throw new Error("Invalid movieId");
      })
    );

    return moviesData;
  }, [filmsUrls]);

  const fetchMovies = useCallback(async (): Promise<void> => {
    setLoadingMovies(true);
    try {
      const moviesData = await getAllMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMovies(false);
    }
  }, [getAllMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loadingMovies };
};

export default useFetchMovies;
