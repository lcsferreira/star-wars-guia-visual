import { useCallback, useEffect, useState } from "react";
import { Character } from "../api/models/Character";
import { getCharacter } from "../api/services/characters";

const useCharacters = (characters: string[]) => {
  const [charactersData, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState<boolean>(false);

  const getAllCharacters = useCallback(async (): Promise<Character[]> => {
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
  }, [characters]);

  const fetchCharacters = useCallback(async (): Promise<void> => {
    setLoadingCharacters(true);
    try {
      const charactersData = await getAllCharacters();
      setCharacters(charactersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCharacters(false);
    }
  }, [getAllCharacters]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { charactersData, loadingCharacters };
};

export default useCharacters;
