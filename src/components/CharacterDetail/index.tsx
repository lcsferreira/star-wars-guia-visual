import { Character } from "../../api/models/Character";
import { Col, Descriptions, Image, Row } from "antd";
import { BackButton, CharacterDetailCard } from "./style";
import CharacterDetailTitle from "../CharacterDetailTitle";
import useWindowDimensions from "../../hooks/useWindowDimensios";

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
  const { height, width } = useWindowDimensions();

  return (
    <CharacterDetailCard
      title={<CharacterDetailTitle characterName={character?.name} />}
      extra={<BackButton to="/characters">Voltar</BackButton>}
      loading={loading}
    >
      <Row gutter={[16, 16]}>
        <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
            alt={character?.name}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={18} xs={24} sm={24} md={18} lg={18} xl={18}>
          <Descriptions
            bordered
            size="small"
            column={1}
            layout={width > 768 ? "horizontal" : "vertical"}
          >
            <Descriptions.Item label="Ano de nascimento">
              {character?.birth_year}
            </Descriptions.Item>
            <Descriptions.Item label="Nasceu em">
              {character?.homeworld}
            </Descriptions.Item>
            <Descriptions.Item label="Espécie">
              {character?.species[0]}
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
    </CharacterDetailCard>
  );
};

export default CharacterDetail;
