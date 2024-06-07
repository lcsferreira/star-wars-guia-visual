import { Avatar, Col, Row, Skeleton, Tooltip } from "antd";
import { CharacterAvatarsContainer } from "./style";
import useCharacters from "../../../hooks/useCharactersAvatars";
import { imgApiUrl } from "../../../api/utils";

interface CharactersAvatarsProps {
  characters: string[];
  title: string;
}

const CharactersAvatars = ({ characters, title }: CharactersAvatarsProps) => {
  const { charactersData, loadingCharacters } = useCharacters(characters);

  return (
    <CharacterAvatarsContainer title={title} loading={loadingCharacters}>
      <Row gutter={[16, 16]} justify="center" align={"middle"}>
        {charactersData.map((character) => (
          <Col key={character.url} xs={10} sm={8} md={6} lg={6} xl={4}>
            {loadingCharacters && <Skeleton.Avatar size={48} active />}
            {!loadingCharacters && (
              <Tooltip title={character.name} placement="top">
                <Avatar
                  size={{ xs: 48, sm: 64, md: 80, lg: 96, xl: 120, xxl: 120 }}
                  src={`${imgApiUrl}characters/${
                    character.url.match(/\d+/)?.[0]
                  }.jpg`}
                  alt={character.name}
                />
              </Tooltip>
            )}
          </Col>
        ))}
      </Row>
    </CharacterAvatarsContainer>
  );
};

export default CharactersAvatars;
