import Link from "antd/es/typography/Link";
import { Starship } from "../../../api/models/Starship";
import { Description, SkeletonImage, StarshipContainer } from "./style";
import { Image, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";

export interface StarshipCardProps {
  starship: Starship;
  loading: boolean;
}

const StarshipCard = ({ starship, loading }: StarshipCardProps) => {
  return (
    <Link href={`/starships/${starship.url.match(/\d+/)?.[0]}`}>
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
              src={`https://starwars-visualguide.com/assets/img/starships/${
                starship?.url?.match(/\d+/)?.[0]
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
          title={starship.name}
          description={
            <Description type="secondary">{starship.name}</Description>
          }
        />
      </StarshipContainer>
    </Link>
  );
};

export default StarshipCard;
