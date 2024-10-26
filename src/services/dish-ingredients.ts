import axios from 'axios'
import { apiBaseUrl } from '../shared/api'
import { IngredientesPrato, Ingredient } from '../types/dishes'

class IngredientPratoService {
    private apiUrl: string

    constructor(apiUrl: string = `${apiBaseUrl}/ingredientesPrato`) {
        this.apiUrl = apiUrl
    }

    async listDishIngredients(): Promise<IngredientesPrato[]> {
        const { data } = await axios.get<IngredientesPrato[]>(this.apiUrl);
        return data
    }

    async getIngredientsByDishId(idPrato: string): Promise<Ingredient[]> {
        const { data } = await axios.get<IngredientesPrato[]>(this.apiUrl)
        const dish = data.find((dish) => dish.idPrato === idPrato)
        if (dish) return dish.ingredientes
        return []
    }
}

export default IngredientPratoService