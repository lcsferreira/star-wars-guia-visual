import { Card, Image } from "antd"; // Import the Image component from antd
import { useEffect, useState } from "react";
import { Movie } from "../../../api/models/Movie";
import { getMovie } from "../../../api/services/movies";
import { CarouselContainer, CharacterMoviesContainer } from "./style";
import { imgApiUrl } from "../../../api/utils";

interface MovieCarouselProps {
  loading: boolean;
  filmsUrls: string[];
}

const MovieCarousel = ({ loading, filmsUrls }: MovieCarouselProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);

  const getAllMovies = async (): Promise<Movie[]> => {
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
  };

  const fetchMovies = async (): Promise<void> => {
    setLoadingMovies(true);
    try {
      const moviesData = await getAllMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filmsUrls]);

  return (
    <CharacterMoviesContainer title="Aparições em filmes" loading={loading}>
      <CarouselContainer arrows autoplay dots>
        {movies.map((movie) => (
          <Card
            key={movie.episode_id}
            title={movie.title}
            loading={loadingMovies}
            cover={
              <Image
                src={`${imgApiUrl}films/${movie.url.match(/\d+/)?.[0]}.jpg`}
                alt={movie.title}
                preview={false}
              />
            }
          ></Card>
        ))}
      </CarouselContainer>
    </CharacterMoviesContainer>
  );
};

export default MovieCarousel;
