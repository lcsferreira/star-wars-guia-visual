import { useEffect, useState } from "react";
import { Movie } from "../../api/models/Movie";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/services/movies";
import { formatMovie } from "../../helpers/formatMovie";
import { Layout, Spin } from "antd";
import { CardError, ContentError, MovieDetailContainer } from "./style";
import MovieDetail from "../../components/MovieDetail";

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
          <MovieDetail movie={movie} loading={loading} movieId={id} />
        )}
        {/* {movie && id && (
          // <>
          //   <MovieCarousel movie={movie} />
          //   <StarshipsCarousel movie={movie} />
          //   <VehiclesCarousel movie={movie} />
          // </>
          <p>{movie}</p>
        )} */}
      </MovieDetailContainer>
    </Layout>
  );
};

export default MovieDetails;
