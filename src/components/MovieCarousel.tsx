import { Card, Image } from "antd"; // Import the Image component from antd
import { useEffect, useState } from "react";
import { Movie } from "../api/models/Movie";
import { getMovie } from "../api/services/movies";
import Carousel from "antd/lib/carousel";
interface MovieCarouselProps {
  loading: boolean;
  filmsUrls: string[];
}

const MovieCarousel = ({ loading, filmsUrls }: MovieCarouselProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);

  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const moviesData = await Promise.all(
        filmsUrls.map(async (url) => {
          const movieId = url.match(/\d+/)?.[0];
          if (movieId) {
            return await getMovie(movieId);
          }
          return null;
        })
      );
      setMovies(moviesData.filter((movie) => movie !== null) as Movie[]);
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
    <Card
      title="Aparições em filmes"
      style={{ width: "50%" }}
      loading={loading}
    >
      <Carousel arrows style={{ width: 300, margin: "0 auto" }} autoplay dots>
        {movies.map((movie) => (
          <Card
            key={movie.episode_id}
            title={movie.title}
            loading={loadingMovies}
            cover={
              <Image
                src={`https://starwars-visualguide.com/assets/img/films/${
                  movie.url.match(/\d+/)?.[0]
                }.jpg`}
                alt={movie.title}
                preview={false}
                width={300}
              />
            }
          ></Card>
        ))}
      </Carousel>
    </Card>
  );
};

export default MovieCarousel;
