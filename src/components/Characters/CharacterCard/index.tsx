import { Image, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { Character } from "../../../api/models/Character";
import { Link } from "react-router-dom";
import { SkeletonImage, CharacterContainer, Description } from "./style";

export interface CharacterCardProps {
  character: Character;
  loading: boolean;
}

const CharacterCard = ({ character, loading }: CharacterCardProps) => {
  return (
    <Link to={`/characters/${character.url.match(/\d+/)?.[0]}`}>
      <CharacterContainer
        key={character.url}
        loading={loading}
        hoverable
        cover={
          true ? (
            <SkeletonImage active />
          ) : (
            <Image
              alt={character.name}
              src={`https://starwars-visualguide.com/assets/img/characters/${
                character?.url?.match(/\d+/)?.[0]
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
          title={character.name}
          description={
            <Description type="secondary">{character.name}</Description>
          }
        />
      </CharacterContainer>
    </Link>
  );
};

export default CharacterCard;
