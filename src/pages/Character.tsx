import { Link, useParams } from "react-router-dom";
import { getCharacter } from "../api/services/characters";
import { useEffect, useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import type { Character } from "../api/models/Character";
import { Col, Descriptions, Image, Layout, Row } from "antd";
import Card from "antd/es/card/Card";
import { formatCharacter } from "../helpers/formatCharacter";

const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const loadCharacter = async (id: string) => {
    setLoading(true);
    const characterData = await getCharacter(id);
    const formattedCharacter = formatCharacter(characterData);
    setCharacter(formattedCharacter);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadCharacter(id);
    }
  }, [id]);

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
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
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
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
        <Card
          title="Informações adicionais"
          style={{ width: "50%" }}
          loading={loading}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Filmes que apareceu">
              {character?.films.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Pertence a">
              {character?.species.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Naves que pilotou">
              {character?.starships.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Veículos que pilotou">
              {character?.vehicles.join(", ")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
};

export default CharacterDetails;
