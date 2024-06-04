import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Character } from "../api/models/Character";
import { Link } from "react-router-dom";

const CharacterCard = (character: Character) => {
  return (
    <Link to={`/characters/${character.url.match(/\d+/)?.[0]}`}>
      <Card
        key={character.url}
        hoverable
        cover={
          <img
            alt={character.name}
            src={`https://starwars-visualguide.com/assets/img/characters/${
              character?.url?.match(/\d+/)?.[0]
            }.jpg`}
          />
        }
        style={{
          width: 240,
          margin: "10px",
        }}
      >
        <Meta
          title={character.name}
          description={
            <div>
              <p>Nasceu em: {character.birth_year}</p>
              <p>Altura: {character.height}</p>
              <p>Massa: {character.mass}</p>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CharacterCard;
