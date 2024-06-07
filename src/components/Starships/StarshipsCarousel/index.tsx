import { useEffect, useState } from "react";
import { Starship } from "../../../api/models/Starship";
import { getStarship } from "../../../api/services/starships";
import { CarouselContainer, CharacterStarshipsContainer } from "./style";
import { Card, Image } from "antd";
import { imgApiUrl } from "../../../api/utils";

interface StarshipsCarouselProps {
  loading: boolean;
  starshipsUrls: string[];
}

const StarshipsCarousel = ({
  loading,
  starshipsUrls,
}: StarshipsCarouselProps) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loadingStarships, setLoadingStarships] = useState<boolean>(false);

  const getAllStarships = async (): Promise<Starship[]> => {
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
  };

  const fetchStarships = async (): Promise<void> => {
    setLoadingStarships(true);
    try {
      const starshipsData = await getAllStarships();
      setStarships(starshipsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStarships(false);
    }
  };

  useEffect(() => {
    fetchStarships();
  }, [starshipsUrls]);

  return (
    <CharacterStarshipsContainer title="Naves que pilotou" loading={loading}>
      <CarouselContainer arrows autoplay dots>
        {starships.map((starship) => (
          <Card
            key={starship.name}
            title={starship.name}
            loading={loadingStarships}
            cover={
              <Image
                src={`${imgApiUrl}starships/${
                  starship.url.match(/\d+/)?.[0]
                }.jpg`}
                alt={starship.name}
                preview={false}
              />
            }
          ></Card>
        ))}
      </CarouselContainer>
    </CharacterStarshipsContainer>
  );
};

export default StarshipsCarousel;
