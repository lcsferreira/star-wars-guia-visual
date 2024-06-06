import { Avatar, Col, Row, Skeleton, Tooltip } from "antd";
import { Character } from "../../../api/models/Character";
import { useEffect, useState } from "react";
import { getCharacter } from "../../../api/services/characters";
import { CharacterAvatarsContainer } from "./style";

interface CharactersAvatarsProps {
  characters: string[];
  title: string;
}

const CharactersAvatars = ({ characters, title }: CharactersAvatarsProps) => {
  const [charactersData, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState<boolean>(false);

  const getAllCharacters = async (): Promise<Character[]> => {
    const charactersData = await Promise.all(
      characters.map(async (url: string): Promise<Character> => {
        const characterId = url.match(/\d+/)?.[0];
        if (characterId) {
          return await getCharacter(characterId);
        }
        throw new Error("Invalid characterId");
      })
    );

    return charactersData;
  };

  const fetchCharacters = async (): Promise<void> => {
    setLoadingCharacters(true);
    try {
      const charactersData = await getAllCharacters();
      setCharacters(charactersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCharacters(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [characters]);

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
                  src={`https://starwars-visualguide.com/assets/img/characters/${
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
