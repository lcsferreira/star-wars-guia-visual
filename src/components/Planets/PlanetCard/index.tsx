import { Planet } from "../../../api/models/Planet";
import { Description, PlanetContainer, SkeletonImage } from "./style";
import { Image } from "antd";
import Meta from "antd/es/card/Meta";
import { imgApiUrl } from "../../../api/utils";

interface PlanetCardProps {
  planet: Planet;
  loading: boolean;
}

const PlanetCard = ({ planet, loading }: PlanetCardProps) => {
  return (
    <PlanetContainer
      key={planet.url}
      loading={loading}
      hoverable
      cover={
        loading ? (
          <SkeletonImage active />
        ) : (
          <Image
            alt={planet.name}
            src={`${imgApiUrl}planets/${planet?.url?.match(/\d+/)?.[0]}.jpg`}
            onError={(e) => {
              e.currentTarget.src = `${imgApiUrl}placeholder.jpg`;
            }}
            preview={false}
            height={300}
          />
        )
      }
    >
      <Meta
        title={planet.name}
        description={<Description type="secondary">{planet.name}</Description>}
      />
    </PlanetContainer>
  );
};

export default PlanetCard;
