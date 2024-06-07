import { Card } from "antd"; // Import the Image component from antd
import {
  CarouselContainer,
  CarouselImage,
  CharacterMoviesContainer,
} from "./style";
import { imgApiUrl } from "../../../api/utils";
import useFetchMovies from "../../../hooks/useFetchMovies";

interface MovieCarouselProps {
  loading: boolean;
  filmsUrls: string[];
}

const MovieCarousel = ({ loading, filmsUrls }: MovieCarouselProps) => {
  const { movies, loadingMovies } = useFetchMovies(filmsUrls);

  return (
    <CharacterMoviesContainer title="Aparições em filmes" loading={loading}>
      <CarouselContainer arrows autoplay dots>
        {movies.map((movie) => (
          <Card
            key={movie.episode_id}
            title={movie.title}
            loading={loadingMovies}
            cover={
              <CarouselImage
                src={`${imgApiUrl}films/${movie.url.match(/\d+/)?.[0]}.jpg`}
                alt={movie.title}
                preview={false}
                onError={(e) => {
                  e.currentTarget.src = `${imgApiUrl}placeholder.jpg`;
                }}
              />
            }
          ></Card>
        ))}
      </CarouselContainer>
    </CharacterMoviesContainer>
  );
};

export default MovieCarousel;
