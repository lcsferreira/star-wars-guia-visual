import { Character } from "../api/models/Character";
import { Link } from "react-router-dom";

import { Col, Descriptions, Image, Row } from "antd";
import Card from "antd/es/card/Card";

interface CharacterDetailProps {
  character: Character;
  loading?: boolean;
  characterId: string;
}

const CharacterDetail = ({
  character,
  loading,
  characterId,
}: CharacterDetailProps) => {
  return (
    <Card
      title={
        <div>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {character?.name}
          </p>
          <p style={{ fontSize: "12px", fontFamily: "AURABESH" }}>
            {character?.name}
          </p>
        </div>
      }
      style={{ width: "50%" }}
      extra={
        <Link to="/characters" style={{ color: "#BC1E22" }}>
          Voltar
        </Link>
      }
      loading={loading}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
            alt={character?.name}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={16}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Ano de nascimento">
              {character?.birth_year}
            </Descriptions.Item>
            <Descriptions.Item label="Nasceu em">
              {character?.homeworld}
            </Descriptions.Item>
            <Descriptions.Item label="Altura">
              {character?.height}
            </Descriptions.Item>
            <Descriptions.Item label="Peso">
              {character?.mass}
            </Descriptions.Item>
            <Descriptions.Item label="Cor dos olhos">
              {character?.eye_color}
            </Descriptions.Item>
            <Descriptions.Item label="Gênero">
              {character?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Cor do cabelo">
              {character?.hair_color}
            </Descriptions.Item>
            <Descriptions.Item label="Cor da pele">
              {character?.skin_color}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default CharacterDetail;
