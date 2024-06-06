import { useEffect, useState } from "react";
import { Movie } from "../../api/models/Movie";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/services/movies";
import { formatMovie } from "../../helpers/formatMovie";
import { Layout, Spin } from "antd";
import { CardError, ContentError, MovieDetailContainer } from "./style";
import MovieDetail from "../../components/Movies/MovieDetail";
import CharactersAvatars from "../../components/Characters/CharactersAvatars";
import PlanetsAvatars from "../../components/Planets/PlanetsAvatars";

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const loadMovie = async (id: string) => {
    try {
      setLoading(true);
      const movieData = await getMovie(id);
      const formattedMovie = formatMovie(movieData);

      setMovie(formattedMovie);
    } catch (error) {
      setError("Erro ao carregar filme");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadMovie(id);
    }
  }, [id]);

  if (error) {
    return (
      <Layout>
        <ContentError>
          <CardError title="Erro">
            <p>{error}</p>
          </CardError>
        </ContentError>
      </Layout>
    );
  }

  return (
    <Layout>
      <MovieDetailContainer>
        {loading && !movie && <Spin size="large" />}
        {movie && id && (
          <>
            <MovieDetail movie={movie} loading={loading} movieId={id} />
            <CharactersAvatars
              characters={movie.characters}
              title="Personagens que apareceram"
            />
            <PlanetsAvatars
              planets={movie.planets}
              title="Planetas que apareceram"
            />
          </>
        )}
      </MovieDetailContainer>
    </Layout>
  );
};

export default MovieDetails;
