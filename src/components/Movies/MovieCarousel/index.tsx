import { Card, Image } from "antd"; // Import the Image component from antd
import { CarouselContainer, CharacterMoviesContainer } from "./style";
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
