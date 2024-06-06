import { useEffect, useState } from "react";
import { Avatar, Col, Row, Skeleton, Tooltip } from "antd";
import { Planet } from "../../../api/models/Planet";
import { getPlanet } from "../../../api/services/planets";
import { PlanetsAvatarsContainer } from "./style";

interface PlanetsAvatarsProps {
  planets: string[];
  title: string;
}

const PlanetsAvatars = ({ planets, title }: PlanetsAvatarsProps) => {
  const [planetsData, setPlanets] = useState<Planet[]>([]);
  const [loadingPlanets, setLoadingPlanets] = useState<boolean>(false);

  const getAllPlanets = async (): Promise<Planet[]> => {
    const planetsData = await Promise.all(
      planets.map(async (url: string): Promise<Planet> => {
        const planetId = url.match(/\d+/)?.[0];
        if (planetId) {
          return await getPlanet(planetId);
        }
        throw new Error("Invalid planetId");
      })
    );

    return planetsData;
  };

  const fetchPlanets = async (): Promise<void> => {
    setLoadingPlanets(true);
    try {
      const planetsData = await getAllPlanets();
      setPlanets(planetsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlanets(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, [planets]);

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
                  src={`https://starwars-visualguide.com/assets/img/planets/${
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
