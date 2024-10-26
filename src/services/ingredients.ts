import apiInstance from "../shared/api";
import { Unit } from "./unit";

export type Ingredient = {
    id: number;
    name: string;
    totalQuantityAvailable: number;
    measurementUnit: Unit
    measurementUnitId?: number;
}

class IngredientService {
    private apiUrl: string;

    constructor(apiUrl: string = `/ingredient`) {
        this.apiUrl = apiUrl;
    }

    async fetchIngredients(): Promise<Ingredient[]> {
        const response = await apiInstance.get(`${this.apiUrl}/list`);
        return response.data;
    }

    async fetchIngredientsByPage(page: number, size: number, sort: string): Promise<any> {
        const response = await apiInstance.get(`${this.apiUrl}/page`, {
            params: {
                page,
                size,
                sort,
            },
        });
        return response.data;
    }

    async getIngredientById(id: number): Promise<Ingredient> {
        const response = await apiInstance.get(`${this.apiUrl}/get/${id}`);
        return response.data;
    }

    async createIngredient(name: string, totalQuantityAvailable: number, measurementUnitId: number): Promise<Ingredient> {
        const response = await apiInstance.post(`${this.apiUrl}/create`, {
            name,
            totalQuantityAvailable,
            measurementUnitId,
        });
        return response.data;
    }

    async updateIngredient(id: number, name: string, totalQuantityAvailable: number, measurementUnitId: number): Promise<Ingredient> {
        const response = await apiInstance.put(`${this.apiUrl}/update/${id}`, {
            name,
            totalQuantityAvailable,
            measurementUnitId,
        });
        return response.data;
    }

    async deleteIngredient(id: number): Promise<void> {
        await apiInstance.delete(`${this.apiUrl}/delete/${id}`);
    }
}

export default IngredientService;
