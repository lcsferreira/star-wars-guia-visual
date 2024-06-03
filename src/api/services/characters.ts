import { Character } from "../models/Character";
import api from "../api";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getCharacters(
  page: number
): Promise<ApiResponse<Character>> {
  const response = await api.get(`/people/?page=${page}`);
  return response.data;
}
