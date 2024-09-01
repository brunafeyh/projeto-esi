import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Prato } from '../types/dishes';

class DishService {
  private apiUrl: string;

  constructor(apiUrl: string = `${apiBaseUrl}/dishes`) {
    this.apiUrl = apiUrl;
  }

  async fetchDishes(): Promise<Prato[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addDish(newDish: Prato): Promise<Prato> {
    const response = await axios.post(this.apiUrl, newDish);
    return response.data;
  }

  async updateDish(updatedDish: Prato): Promise<Prato> {
    const response = await axios.put(`${this.apiUrl}/${updatedDish.id}`, updatedDish);
    return response.data;
  }

  async deleteDish(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

export default DishService;
