import { Card, Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          color: "white",
          fontSize: "24px",
          textAlign: "center",
          backgroundColor: "transparent",
          marginTop: "20px",
        }}
      >
        Bem-vindo ao Guia Visual de{" "}
        <span
          style={{
            color: "#BC1E22",
            fontSize: "32px",
            fontFamily: "SFDistantGalaxy-Regular",
          }}
        >
          Star Wars
        </span>
      </Header>
      <Content style={{ padding: "50px" }}>
        <Row justify="start" gutter={[16, 16]}>
          <Col span={6}>
            <Link to="/characters">
              <Card
                style={{
                  height: "100%",
                }}
                title="Personagens"
                hoverable
                cover={
                  <img
                    style={{
                      borderRadius: "0",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt="character"
                    src="https://images.unsplash.com/photo-1547700055-b61cacebece9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                }
              >
                Descubra sobre os personagens.
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Card
              style={{
                height: "100%",
              }}
              title="Filmes"
              hoverable
              cover={
                <img
                  style={{
                    borderRadius: "0",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="film"
                  src="https://images.unsplash.com/photo-1605270488815-93566ee46a1f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              }
            >
              Veja a lista de filmes.
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                height: "100%",
              }}
              title="Planetas"
              hoverable
              cover={
                <img
                  style={{
                    borderRadius: "0",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="planet"
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              }
            >
              Explore os diferentes planetas.
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                height: "100%",
              }}
              title="Naves"
              hoverable
              cover={
                <img
                  style={{
                    borderRadius: "0",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="starship"
                  src="https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              }
            >
              Conheça as naves espaciais.
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 Star Wars App, Inc.</Footer>
    </Layout>
  );
};
