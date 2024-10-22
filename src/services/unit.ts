import apiInstance from "../shared/api";


export interface Unit {
    id: number;
    name: string;
    acronym: string;
}

class UnitService {
    private apiUrl: string

    constructor() {
        this.apiUrl = '/measurement-unit' 
    }

    async fetchUnits(): Promise<Unit[]> {
        const response = await apiInstance.get(`${this.apiUrl}/list`);
        return response.data;
    }

    async addUnit(newUnit: Omit<Unit, 'id'>): Promise<Unit> {
        const response = await apiInstance.post(`${this.apiUrl}/create`, newUnit);
        return response.data;
    }

    async updateUnit(updatedUnit: Unit): Promise<Unit> {
        const response = await apiInstance.put(`${this.apiUrl}/update/${updatedUnit.id}`, updatedUnit);
        return response.data;
    }

    async deleteUnit(id: number): Promise<void> {
        await apiInstance.delete(`${this.apiUrl}/delete/${id}`);
    }
}

export default UnitService;
