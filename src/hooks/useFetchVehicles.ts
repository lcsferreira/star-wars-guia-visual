import { useCallback, useEffect, useState } from "react";
import { Vehicle } from "../api/models/Vehicle";
import { getVehicle } from "../api/services/vehicles";

const useFetchVehicles = (vehiclesUrls: string[]) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(false);

  const getAllVehicles = useCallback(async (): Promise<Vehicle[]> => {
    const vehiclesData = await Promise.all(
      vehiclesUrls.map(async (url: string): Promise<Vehicle> => {
        const vehicleId = url.match(/\d+/)?.[0]; // Add a null check before accessing the first element
        if (vehicleId) {
          return await getVehicle(vehicleId);
        }
        throw new Error("Invalid vehicleId");
      })
    );

    return vehiclesData;
  }, [vehiclesUrls]);

  const fetchVehicles = useCallback(async (): Promise<void> => {
    setLoadingVehicles(true);
    try {
      const vehiclesData = await getAllVehicles();
      setVehicles(vehiclesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingVehicles(false);
    }
  }, [getAllVehicles]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loadingVehicles };
};

export default useFetchVehicles;
