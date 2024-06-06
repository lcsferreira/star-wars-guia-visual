import { Character } from "../api/models/Character";
import { getPlanet } from "../api/services/planets";
import { getSpecie } from "../api/services/species";

export const formatHeight = (height: string) => {
  const heightInCm = parseInt(height, 10);
  const heightInFeet = heightInCm / 30.48;
  return `${heightInCm} cm (${heightInFeet.toFixed(2)} ft)`;
};
export const formatBirthDate = (birthDate: string) => {
  // birthDate is in the format "19BBY"
  // We need to extract the year and the era
  // The era is either "BBY" or "ABY"
  const date = birthDate.match(/(\d+)(\w+)/);
  if (!date) return "Desconhecido";
  return `${date[1]} ${
    date[2] === "BBY" ? "anos antes" : "anos depois"
  } da batalha de Yavin`;
};

export const formatMass = (mass: string) => {
  const massInKg = parseInt(mass, 10);
  const massInLb = massInKg * 2.20462;
  return `${massInKg} kg (${massInLb.toFixed(2)} lb)`;
};

export const translateGender = (gender: string) => {
  if (gender === "male") return "Masculino";
  else if (gender === "female") return "Feminino";
  else return "Outro";
};

export const translateHairColor = (hairColor: string) => {
  if (hairColor === "blond") return "Loiro";
  else if (hairColor === "brown") return "Castanho";
  else if (hairColor === "black") return "Preto";
  else if (hairColor === "auburn") return "Ruivo";
  else if (hairColor === "white") return "Branco";
  else if (hairColor === "grey") return "Cinza";
  else if (hairColor === "none") return "Nenhum";
  else if (hairColor === "n/a") return "Não possui";
  else return "Não informado";
};

export const translateEyeColor = (eyeColor: string) => {
  if (eyeColor === "blue") return "Azul";
  else if (eyeColor === "yellow") return "Amarelo";
  else if (eyeColor === "red") return "Vermelho";
  else if (eyeColor === "brown") return "Castanho";
  else if (eyeColor === "blue-gray") return "Azul acinzentado";
  else if (eyeColor === "black") return "Preto";
  else if (eyeColor === "orange") return "Laranja";
  else if (eyeColor === "hazel") return "Avelã";
  else if (eyeColor === "pink") return "Rosa";
  else if (eyeColor === "gold") return "Dourado";
  else if (eyeColor === "green") return "Verde";
  else if (eyeColor === "white") return "Branco";
  else if (eyeColor === "dark") return "Escuro";
  else if (eyeColor === "unknown") return "Desconhecido";
  else return "Não informado";
};

export const translateSkinColor = (skinColor: string) => {
  if (skinColor === "fair") return "Clara";
  else if (skinColor === "gold") return "Dourada";
  else if (skinColor === "white") return "Branca";
  else if (skinColor === "light") return "Clara";
  else if (skinColor === "pale") return "Pálida";
  else if (skinColor === "metal") return "Metálica";
  else if (skinColor === "dark") return "Escura";
  else if (skinColor === "brown") return "Morena";
  else if (skinColor === "brown mottle") return "Marmorizada";
  else if (skinColor === "grey") return "Cinza";
  else if (skinColor === "green-tan") return "Verde-alaranjada";
  else if (skinColor === "unknown") return "Desconhecida";
  else return "Não informado";
};

const fetchHomeWorldName = async (id: string): Promise<string> => {
  try {
    const response = await getPlanet(id);
    return response.name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

const fetchSpeciesName = async (id: string): Promise<string> => {
  try {
    const response = await getSpecie(id);
    return response.name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const formatCharacter = async (
  character: Character
): Promise<Character> => {
  character.height = formatHeight(character.height);
  character.birth_year = formatBirthDate(character.birth_year);
  character.mass = formatMass(character.mass);
  character.gender = translateGender(character.gender);
  character.hair_color = translateHairColor(character.hair_color);
  character.eye_color = translateEyeColor(character.eye_color);
  character.skin_color = translateSkinColor(character.skin_color);
  const homeWorldId = character.homeworld.match(/\d+/)?.[0] || "";
  const homeWorldName = await fetchHomeWorldName(homeWorldId);

  if (homeWorldName === "unknown") {
    character.homeworld = "Desconhecido";
  } else {
    character.homeworld = homeWorldName;
  }

  if (character.species.length === 0) {
    character.species.push("Humano");
  } else {
    const speciesId = character.species[0].match(/\d+/)?.[0] || "";
    const speciesName = await fetchSpeciesName(speciesId);

    if (speciesName === "Yoda's species") {
      character.species[0] = "Yoda";
    } else {
      character.species[0] = speciesName;
    }
  }

  return character;
};
