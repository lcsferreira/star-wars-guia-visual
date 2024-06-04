import { Image, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { Character } from "../../api/models/Character";
import { Link } from "react-router-dom";
import { StyledCard } from "./style";

interface CharacterCardProps {
  character: Character;
  loading: boolean;
}

const CharacterCard = ({ character, loading }: CharacterCardProps) => {
  return (
    <Link to={`/characters/${character.url.match(/\d+/)?.[0]}`}>
      <StyledCard
        key={character.url}
        loading={loading}
        hoverable
        cover={
          loading ? (
            <Skeleton.Image style={{ height: 300, width: 240 }} active />
          ) : (
            <Image
              alt={character.name}
              src={`https://starwars-visualguide.com/assets/img/characters/${
                character?.url?.match(/\d+/)?.[0]
              }.jpg`}
              preview={false}
              height={300}
            />
          )
        }
        style={{
          width: 240,
          margin: "10px",
          height: 400,
        }}
      >
        <Meta
          title={character.name}
          description={
            <p style={{ fontSize: "12px", fontFamily: "AURABESH" }}>
              {character.name}
            </p>
          }
        />
      </StyledCard>
    </Link>
  );
};

export default CharacterCard;
