import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Ingredient } from '../../types/dishes'
import IngredientPratoService from '../../services/dish-ingredients'

const service = new IngredientPratoService()

const fetchIngredientsByDishId = async (idPrato: string): Promise<Ingredient[]> => {
  try {
    return service.getIngredientsByDishId(idPrato)
  } catch (error) {
    toast.error('Erro ao carregar os ingredientes')
    throw error
  }
}

const useDishIngredients = (idPrato: string) => {
  return useQuery<Ingredient[], Error>({
    queryKey: ['ingredientesPrato', idPrato],
    queryFn: () => fetchIngredientsByDishId(idPrato),
  })
}

export default useDishIngredients
