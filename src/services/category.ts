import apiInstance from "../shared/api";

export interface Category {
    id: number;
    name: string;
}

class CategoryService {
    private apiUrl: string;

    constructor(apiUrl: string = `/category`) {
        this.apiUrl = apiUrl;
    }

    async fetchCategories(): Promise<Category[]> {
        const response = await apiInstance.get(`${this.apiUrl}/list`);
        return response.data
    }

    async addCategory(newCategory: string): Promise<Category> {
        const response = await apiInstance.post(`${this.apiUrl}/create`, { name: newCategory });
        return response.data;
    }

    async updateCategory(updateCategory: Category): Promise<Category> {
        const response = await apiInstance.put(`${this.apiUrl}/update/${updateCategory.id}`, { name: updateCategory.name });
        return response.data;
    }

    async getCategoryById(id: number): Promise<Category> {
        const response = await apiInstance.get(`${this.apiUrl}/${id}`);
        return response.data;
    }

    async deleteCategory(id: number): Promise<void> {
        await apiInstance.delete(`${this.apiUrl}/delete/${id}`);
    }
}

export default CategoryService;
