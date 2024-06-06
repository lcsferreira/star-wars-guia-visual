import api from "../api";

export async function getVehicles(page: number, search: string): Promise<any> {
  const response = await api.get(`/vehicles/?page=${page}&search=${search}`);
  return response.data;
}

export async function getVehicle(id: string): Promise<any> {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
}
