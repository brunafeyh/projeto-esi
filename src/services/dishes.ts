import { DishValueForm } from '../types/dishes';
import apiInstance from '../shared/api';
import { Dish } from '../types/dish';

class DishService {
  private apiUrl: string;

  constructor(apiUrl: string = `/dish`) {
    this.apiUrl = apiUrl;
  }

  async fetchDishes(page: number, size: number): Promise<any> {
    const response = await apiInstance.get(`${this.apiUrl}/page`, {
      params: { page, size }
    });
    return response.data;
  }

  async fetchDishById(id: string): Promise<DishValueForm> {
    const response = await apiInstance.get(`${this.apiUrl}/get/${id}`);
    return response.data;
  }

  async addDish(newDish: DishValueForm): Promise<DishValueForm> {
    const response = await apiInstance.post(`${this.apiUrl}/create`, newDish);
    return response.data;
  }

  async updateDish(id: string, updatedDish: DishValueForm): Promise<DishValueForm> {
    const response = await apiInstance.put(`${this.apiUrl}/update/${id}`, updatedDish);
    return response.data;
  }

  async deleteDish(id: string): Promise<void> {
    await apiInstance.delete(`${this.apiUrl}/delete/${id}`);
  }

  async transcribeGemini(geminiData: any): Promise<any> {
    const response = await apiInstance.post(`${this.apiUrl}/transcribe-gemini`, geminiData);
    return response.data;
  }

  async handleChatMessage(chatData: any): Promise<any> {
    const response = await apiInstance.post(`${this.apiUrl}/chat`, chatData);
    return response.data;
  }

  async fetchDishList(): Promise<Dish[]> {
    const response = await apiInstance.get(`${this.apiUrl}/list`);
    return response.data;
  }
}

export default DishService;
