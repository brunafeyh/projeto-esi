import axios from 'axios';
import { apiBaseUrl } from '../shared/api';

export interface Category {
    id: number;
    name: string;
}

class CategoryService {
    private apiUrl: string;

    constructor(apiUrl: string = `${apiBaseUrl}/categories`) {
        this.apiUrl = apiUrl;
    }

    async fetchCategories(): Promise<Category[]> {
        const response = await axios.get(this.apiUrl);
        return response.data;
    }

    async addCategory(newCategory: string): Promise<Category> {
        const response = await axios.post(this.apiUrl, newCategory);
        return response.data;
    }

    async updateCategory(updatedCategory: Category): Promise<Category> {
        const response = await axios.put(`${this.apiUrl}/${updatedCategory.id}`, updatedCategory);
        return response.data;
    }
    async getCategoryById(id: number): Promise<Category> {
        const response = await axios.get(`${this.apiUrl}/${id}`);
        return response.data;
    }
    async deleteCategory(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/${id}`);
    }
}

export default CategoryService;
