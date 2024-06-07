import { Starship } from "../../../api/models/Starship";
import { Description, SkeletonImage, StarshipContainer } from "./style";
import { Image } from "antd";
import Meta from "antd/es/card/Meta";
import { imgApiUrl } from "../../../api/utils";

export interface StarshipCardProps {
  starship: Starship;
  loading: boolean;
}

const StarshipCard = ({ starship, loading }: StarshipCardProps) => {
  return (
    <StarshipContainer
      key={starship.url}
      loading={loading}
      hoverable
      cover={
        loading ? (
          <SkeletonImage active />
        ) : (
          <Image
            alt={starship.name}
            src={`${imgApiUrl}starships/${
              starship?.url?.match(/\d+/)?.[0]
            }.jpg`}
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
        title={starship.name}
        description={
          <Description type="secondary">{starship.name}</Description>
        }
      />
    </StarshipContainer>
  );
};

export default StarshipCard;
