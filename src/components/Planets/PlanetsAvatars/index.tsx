import { Avatar, Col, Row, Skeleton, Tooltip } from "antd";
import { PlanetsAvatarsContainer } from "./style";
import { imgApiUrl } from "../../../api/utils";
import useFetchPlanets from "../../../hooks/useFetchPlanets";

interface PlanetsAvatarsProps {
  planets: string[];
  title: string;
}

const PlanetsAvatars = ({ planets, title }: PlanetsAvatarsProps) => {
  const { planetsData, loadingPlanets } = useFetchPlanets(planets);

  return (
    <PlanetsAvatarsContainer title={title} loading={loadingPlanets}>
      <Row gutter={[16, 16]} justify="center" align={"middle"}>
        {planetsData.map((planet) => (
          <Col key={planet.url} xs={10} sm={8} md={6} lg={6} xl={4}>
            {loadingPlanets && <Skeleton.Avatar size={48} active />}
            {!loadingPlanets && (
              <Tooltip title={planet.name} placement="top">
                <Avatar
                  size={{ xs: 48, sm: 64, md: 80, lg: 96, xl: 120, xxl: 120 }}
                  src={`${imgApiUrl}planets/${
                    planet.url.match(/\d+/)?.[0]
                  }.jpg`}
                  alt={planet.name}
                />
              </Tooltip>
            )}
          </Col>
        ))}
      </Row>
    </PlanetsAvatarsContainer>
  );
};

export default PlanetsAvatars;
