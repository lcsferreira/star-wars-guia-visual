import { useCallback, useEffect, useState } from "react";
import { Planet } from "../api/models/Planet";
import { getPlanet } from "../api/services/planets";

const useFetchPlanets = (planetsUrls: string[]) => {
  const [planetsData, setPlanets] = useState<Planet[]>([]);
  const [loadingPlanets, setLoadingPlanets] = useState<boolean>(false);

  const getAllPlanets = useCallback(async (): Promise<Planet[]> => {
    const planetsData = await Promise.all(
      planetsUrls.map(async (url: string): Promise<Planet> => {
        const planetId = url.match(/\d+/)?.[0];
        if (planetId) {
          return await getPlanet(planetId);
        }
        throw new Error("Invalid planetId");
      })
    );

    return planetsData;
  }, [planetsUrls]);

  const fetchPlanets = useCallback(async (): Promise<void> => {
    setLoadingPlanets(true);
    try {
      const planetsData = await getAllPlanets();
      setPlanets(planetsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPlanets(false);
    }
  }, [getAllPlanets]);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return { planetsData, loadingPlanets };
};

export default useFetchPlanets;
