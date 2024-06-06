import { Movie } from "../../api/models/Movie";
import { Image } from "antd/lib";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { MovieContainer } from "./style";

interface MovieCardProps {
  movie: Movie;
  loading: boolean;
}

const MovieCard = ({ movie, loading }: MovieCardProps) => {
  const id = movie.url.match(/\d+/)?.[0];
  return (
    <Link to={`/movies/${id}`}>
      <MovieContainer
        title={movie.title}
        hoverable
        loading={loading}
        cover={
          <Image
            alt={movie.title}
            src={`https://starwars-visualguide.com/assets/img/films/${
              movie?.url?.match(/\d+/)?.[0]
            }.jpg`}
            preview={false}
          />
        }
      >
        <Meta title={movie.title} description={movie.release_date} />
      </MovieContainer>
    </Link>
  );
};

export default MovieCard;
