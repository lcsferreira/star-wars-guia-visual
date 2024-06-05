import { Card } from "antd";
import { Movie } from "../api/models/Movie";

interface MovieCardProps {
  movie: Movie;
  loading: boolean;
}

const MovieCard = ({ movie, loading }: MovieCardProps) => {
  return (
    <Card
      title={movie.title}
      style={{ width: 300, margin: "20px" }}
      extra={<a href={`/movies/${movie.episode_id}`}>Detalhes</a>}
      loading={loading}
      cover={
        <img
          alt={movie.title}
          src={`https://starwars-visualguide.com/assets/img/films/${
            movie?.url?.match(/\d+/)?.[0]
          }.jpg`}
        />
      }
    >
      <p>
        <strong>Episódio:</strong> {movie.episode_id}
      </p>
      <p>
        <strong>Diretor:</strong> {movie.director}
      </p>
      <p>
        <strong>Produtor:</strong> {movie.producer}
      </p>
      <p>
        <strong>Data de lançamento:</strong> {movie.release_date}
      </p>
    </Card>
  );
};

export default MovieCard;
