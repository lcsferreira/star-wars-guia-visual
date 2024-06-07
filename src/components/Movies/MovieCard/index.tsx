import { Movie } from "../../../api/models/Movie";
import { Image } from "antd/lib";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { MovieContainer } from "./style";
import { imgApiUrl } from "../../../api/utils";

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
          loading ? (
            <Image
              alt={movie.title}
              src={`${imgApiUrl}placeholder.jpg`}
              preview={false}
            />
          ) : (
            <Image
              alt={movie.title}
              src={`${imgApiUrl}films/${movie?.url?.match(/\d+/)?.[0]}.jpg`}
              onError={(e) => {
                e.currentTarget.src = `${imgApiUrl}placeholder.jpg`;
              }}
              preview={false}
            />
          )
        }
      >
        <Meta title={movie.title} description={movie.release_date} />
      </MovieContainer>
    </Link>
  );
};

export default MovieCard;
