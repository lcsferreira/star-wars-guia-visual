import { Link, useParams } from "react-router-dom";
import { getCharacter } from "../api/services/characters";
import { useEffect, useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import type { Character } from "../api/models/Character";
import { Col, Descriptions, Image, Layout, Row } from "antd";
import Card from "antd/es/card/Card";

const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const loadCharacter = async (id: string) => {
    setLoading(true);
    const character = await getCharacter(id);
    setCharacter(character);
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
          title={character?.name}
          style={{ width: "50%" }}
          extra={<Link to="/characters">Back</Link>}
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
            <Col span={12}>
              <Descriptions column={1}>
                <Descriptions.Item label="Birth Year">
                  {character?.birth_year}
                </Descriptions.Item>
                <Descriptions.Item label="Homeworld">
                  {character?.homeworld}
                </Descriptions.Item>
                <Descriptions.Item label="Height">
                  {character?.height}
                </Descriptions.Item>
                <Descriptions.Item label="Mass">
                  {character?.mass}
                </Descriptions.Item>
                <Descriptions.Item label="Eye Color">
                  {character?.eye_color}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {character?.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Hair Color">
                  {character?.hair_color}
                </Descriptions.Item>
                <Descriptions.Item label="Skin Color">
                  {character?.skin_color}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
        <Card
          title="Additional Information"
          style={{ width: "50%" }}
          loading={loading}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Films">
              {character?.films.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Species">
              {character?.species.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Starships">
              {character?.starships.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicles">
              {character?.vehicles.join(", ")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
};

export default CharacterDetails;
