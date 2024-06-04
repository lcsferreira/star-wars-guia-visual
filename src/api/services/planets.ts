import api from "../api";

export async function getPlanets(page: number, search: string): Promise<any> {
  const response = await api.get(`/planets/?page=${page}&search=${search}`);
  return response.data;
}

export async function getPlanet(id: string): Promise<any> {
  const response = await api.get(`/planets/${id}`);
  return response.data;
}
