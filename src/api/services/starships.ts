import api from "../api";

export async function getStarships(page: number, search: string): Promise<any> {
  const response = await api.get(`/starships/?page=${page}&search=${search}`);
  return response.data;
}

export async function getStarship(id: string): Promise<any> {
  const response = await api.get(`/starships/${id}`);
  return response.data;
}
