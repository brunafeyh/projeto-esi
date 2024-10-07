import axios from 'axios';
import { Ingredient } from '../types/dishes';
import { apiBaseUrl } from '../shared/api';

class IngredientService {
  private apiUrl: string

  constructor(apiUrl: string = `${apiBaseUrl}/ingredientes`) {
    this.apiUrl = apiUrl
  }

  async fetchIngredients(): Promise<Ingredient[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addIngredient(newIngredient: Partial<Ingredient>): Promise<Ingredient> {
    const response = await axios.post(this.apiUrl, newIngredient);
    return response.data;
  }
  async updateIngredient(id: string, updatedData: Partial<Ingredient>): Promise<void> {
    await axios.put(`${this.apiUrl}/${id}`, updatedData);
  }

  async deleteIngredient(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

export default IngredientService
