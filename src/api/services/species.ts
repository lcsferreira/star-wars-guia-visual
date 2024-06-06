import api from "../api";

export async function getSpecies(page: number, search: string): Promise<any> {
  const response = await api.get(`/species/?page=${page}&search=${search}`);
  return response.data;
}

export async function getSpecie(id: string): Promise<any> {
  const response = await api.get(`/species/${id}`);
  return response.data;
}
