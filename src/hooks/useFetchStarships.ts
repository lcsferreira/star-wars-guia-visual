import { useCallback, useEffect, useState } from "react";
import { Starship } from "../api/models/Starship";
import { getStarship } from "../api/services/starships";

const useFetchStarships = (starshipsUrls: string[]) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loadingStarships, setLoadingStarships] = useState<boolean>(false);

  const getAllStarships = useCallback(async (): Promise<Starship[]> => {
    const starshipsData = await Promise.all(
      starshipsUrls.map(async (url: string): Promise<Starship> => {
        const starshipId = url.match(/\d+/)?.[0]; // Add a null check before accessing the first element
        if (starshipId) {
          return await getStarship(starshipId);
        }
        throw new Error("Invalid starshipId");
      })
    );

    return starshipsData;
  }, [starshipsUrls]);

  const fetchStarships = useCallback(async (): Promise<void> => {
    setLoadingStarships(true);
    try {
      const starshipsData = await getAllStarships();
      setStarships(starshipsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStarships(false);
    }
  }, [getAllStarships]);

  useEffect(() => {
    fetchStarships();
  }, [fetchStarships]);

  return { starships, loadingStarships };
};

export default useFetchStarships;
