import { useEffect, useState } from "react";
import { getVehicle } from "../../api/services/vehicles";
import { Card, Image } from "antd";
import { CarouselContainer, CharacterVehiclesContainer } from "./style";
import { Vehicle } from "../../api/models/Vehicle";

interface VehiclesCarouselProps {
  loading: boolean;
  vehiclesUrls: string[];
}

const VehiclesCarousel = ({ loading, vehiclesUrls }: VehiclesCarouselProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(false);

  const getAllVehicles = async (): Promise<Vehicle[]> => {
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
  };

  const fetchVehicles = async (): Promise<void> => {
    setLoadingVehicles(true);
    try {
      const vehiclesData = await getAllVehicles();
      setVehicles(vehiclesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [vehiclesUrls]);

  return (
    <CharacterVehiclesContainer title="Veículos que pilotou" loading={loading}>
      <CarouselContainer arrows autoplay dots>
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.name}
            title={vehicle.name}
            loading={loadingVehicles}
            cover={
              <Image
                src={`https://starwars-visualguide.com/assets/img/vehicles/${
                  vehicle.url.match(/\d+/)?.[0]
                }.jpg`}
                alt={vehicle.name}
                preview={false}
              />
            }
          ></Card>
        ))}
      </CarouselContainer>
    </CharacterVehiclesContainer>
  );
};

export default VehiclesCarousel;
