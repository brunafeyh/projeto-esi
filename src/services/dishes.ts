import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Dishe } from '../types/dishes';

class DishService {
  private apiUrl: string;

  constructor(apiUrl: string = `${apiBaseUrl}/pratos`) {
    this.apiUrl = apiUrl;
    
  }

  async fetchDishes(): Promise<Dishe[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addDish(newDish: Dishe): Promise<Dishe> {
    const response = await axios.post(this.apiUrl, newDish);
    return response.data;
  }

  async updateDish(updatedDish: Dishe): Promise<Dishe> {
    const response = await axios.put(`${this.apiUrl}/${updatedDish.id}`, updatedDish);
    return response.data;
  }

  async deleteDish(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

export default DishService;
