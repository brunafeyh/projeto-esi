import { Dishe } from '../types/dishes';
import apiInstance from '../shared/api';
import { Dish } from '../types/dish';

class DishService {
  private apiUrl: string;

  constructor(apiUrl: string = `/dish`) {
    this.apiUrl = apiUrl;
  }

  // Fetch paginated dishes
  async fetchDishes(page: number, size: number): Promise<any> {
    const response = await apiInstance.get(`${this.apiUrl}/page`, {
      params: { page, size }
    });
    return response.data;
  }

  // Fetch dish by ID
  async fetchDishById(id: string): Promise<Dishe> {
    const response = await apiInstance.get(`${this.apiUrl}/get/${id}`);
    return response.data;
  }

  // Add a new dish
  async addDish(newDish: Dishe): Promise<Dishe> {
    const response = await apiInstance.post(`${this.apiUrl}/create`, newDish);
    return response.data;
  }

  // Update an existing dish by ID
  async updateDish(id: string, updatedDish: Dishe): Promise<Dishe> {
    const response = await apiInstance.put(`${this.apiUrl}/update/${id}`, updatedDish);
    return response.data;
  }

  // Delete a dish by ID
  async deleteDish(id: string): Promise<void> {
    await apiInstance.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Transcribe a dish from Gemini input
  async transcribeGemini(geminiData: any): Promise<any> {
    const response = await apiInstance.post(`${this.apiUrl}/transcribe-gemini`, geminiData);
    return response.data;
  }

  // Handle chat message for dish creation
  async handleChatMessage(chatData: any): Promise<any> {
    const response = await apiInstance.post(`${this.apiUrl}/chat`, chatData);
    return response.data;
  }

  // Fetch list of dishes
  async fetchDishList(): Promise<Dish[]> {
    const response = await apiInstance.get(`${this.apiUrl}/list`);
    return response.data;
  }
}

export default DishService;
