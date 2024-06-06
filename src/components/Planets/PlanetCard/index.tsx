import { Link } from "react-router-dom";
import { Planet } from "../../../api/models/Planet";
import { Description, PlanetContainer, SkeletonImage } from "./style";
import { Image } from "antd";
import Meta from "antd/es/card/Meta";

interface PlanetCardProps {
  planet: Planet;
  loading: boolean;
}

const PlanetCard = ({ planet, loading }: PlanetCardProps) => {
  return (
    // <Link to={`/planets/${planet.url.match(/\d+/)?.[0]}`}>
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
            src={`https://starwars-visualguide.com/assets/img/planets/${
              planet?.url?.match(/\d+/)?.[0]
            }.jpg`}
            onError={(e) => {
              e.currentTarget.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
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
    // </Link>
  );
};

export default PlanetCard;
