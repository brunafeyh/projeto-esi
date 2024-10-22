import axios from 'axios';
import { apiBaseUrl } from '../shared/api';

export interface Unit {
    id: number;
    name: string;
    acronym: string;
}

class UnitService {
    private apiUrl: string;

    constructor(apiUrl: string = `${apiBaseUrl}/units`) {
        this.apiUrl = apiUrl;
    }

    async fetchUnits(): Promise<Unit[]> {
        const response = await axios.get(this.apiUrl);
        return response.data;
    }

    async addUnit(newUnit: Omit<Unit, 'id'>): Promise<Unit> {
        const response = await axios.post(this.apiUrl, newUnit);
        return response.data;
    }

    async updateUnit(updatedUnit: Unit): Promise<Unit> {
        const response = await axios.put(`${this.apiUrl}/${updatedUnit.id}`, updatedUnit);
        return response.data;
    }

    async getUnitById(id: number): Promise<Unit> {
        const response = await axios.get(`${this.apiUrl}/${id}`);
        return response.data;
    }

    async deleteUnit(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/${id}`);
    }
}

export default UnitService
