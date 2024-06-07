import { Movie } from "../api/models/Movie";

const translateTitle = (title: string): string => {
  if (title === "A New Hope") {
    return "Uma Nova Esperança";
  }
  if (title === "The Empire Strikes Back") {
    return "O Império Contra-Ataca";
  }
  if (title === "Return of the Jedi") {
    return "O Retorno de Jedi";
  }
  if (title === "The Phantom Menace") {
    return "A Ameaça Fantasma";
  }
  if (title === "Attack of the Clones") {
    return "Ataque dos Clones";
  }
  if (title === "Revenge of the Sith") {
    return "A Vingança dos Sith";
  }
  if (title === "The Force Awakens") {
    return "O Despertar da Força";
  }
  if (title === "The Last Jedi") {
    return "Os Últimos Jedi";
  }
  if (title === "The Rise of Skywalker") {
    return "A Ascensão Skywalker";
  }
  return title;
};

const formatReleaseDate = (date: string): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
};

export const formatMovie = (movie: Movie): Movie => {
  return {
    ...movie,
    release_date: formatReleaseDate(movie.release_date),
    title: translateTitle(movie.title),
  };
};
