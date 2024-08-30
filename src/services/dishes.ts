import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Prato } from '../types/dishes';

export const fetchPratos = async (): Promise<Prato[]> => {
  const response = await axios.get(`${apiBaseUrl}/pratos`);
  return response.data;
};

export const addPrato = async (newPrato: Prato): Promise<Prato> => {
  const response = await axios.post(`${apiBaseUrl}/pratos`, newPrato);
  return response.data;
};

export const updatePrato = async (updatedPrato: Prato): Promise<Prato> => {
  const response = await axios.put(`${apiBaseUrl}/pratos/${updatedPrato.id}`, updatedPrato);
  return response.data;
};

export const deletePrato = async (id: string): Promise<void> => {
  await axios.delete(`${apiBaseUrl}/pratos/${id}`);
};
