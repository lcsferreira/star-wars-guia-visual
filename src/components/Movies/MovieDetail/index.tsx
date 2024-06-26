import { Col, Row, Typography, Image, Descriptions, Button } from "antd";
import { Movie } from "../../../api/models/Movie";
import { BackButton, MovieDetailCard } from "./style";
import StarWarsCrawl from "../StarWarsCrawl";
import { useState } from "react";
import PlayCircleFilled from "@ant-design/icons/lib/icons/PlayCircleFilled";
import StopFilled from "@ant-design/icons/lib/icons/StopFilled";
import useWindowDimensions from "../../../hooks/useWindowDimensios";
import { imgApiUrl } from "../../../api/utils";

interface MovieDetailProps {
  movie: Movie;
  loading?: boolean;
  movieId: string;
}

const MovieDetail = ({ movie, loading, movieId }: MovieDetailProps) => {
  const [playOpeningCrawl, setPlayOpeningCrawl] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  return (
    <>
      <MovieDetailCard
        title={
          <Typography.Title level={2} ellipsis={{ rows: 1 }}>
            {movie?.title}
          </Typography.Title>
        }
        extra={<BackButton to="/movies">Voltar</BackButton>}
        loading={loading}
      >
        <Row gutter={[16, 16]}>
          <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
            <Image
              src={`${imgApiUrl}films/${movieId}.jpg`}
              alt={movie?.title}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={18} xs={24} sm={24} md={18} lg={18} xl={18}>
            <Descriptions
              bordered
              size="small"
              column={1}
              layout={width > 900 ? "horizontal" : "vertical"}
            >
              <Descriptions.Item label="Diretor">
                {movie?.director}
              </Descriptions.Item>
              <Descriptions.Item label="Produtor">
                {movie?.producer}
              </Descriptions.Item>
              <Descriptions.Item label="Data de lançamento">
                {movie?.release_date}
              </Descriptions.Item>
              <Descriptions.Item label="Episódio">
                {movie?.episode_id}
              </Descriptions.Item>
              <Descriptions.Item label="Abertura">
                <Button
                  type="primary"
                  icon={
                    playOpeningCrawl ? <StopFilled /> : <PlayCircleFilled />
                  }
                  onClick={() => setPlayOpeningCrawl(!playOpeningCrawl)}
                >
                  {playOpeningCrawl ? "Stop" : "Play"}
                </Button>
                {playOpeningCrawl && (
                  <StarWarsCrawl
                    close={() => setPlayOpeningCrawl(false)}
                    width={width}
                    animate={playOpeningCrawl}
                    text={movie.opening_crawl}
                    episode={movie.episode_id}
                    title={movie.title}
                  />
                )}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </MovieDetailCard>
    </>
  );
};

export default MovieDetail;
