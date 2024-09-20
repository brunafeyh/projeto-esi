import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IngredientesPrato, Ingredient } from '../types/dishes'
import { apiBaseUrl } from '../shared/api';

const fetchIngredientsByDishId = async (idPrato: string): Promise<Ingredient[]> => {
  try {
    const { data } = await axios.get<IngredientesPrato[]>(`${apiBaseUrl}/ingredientesPrato`);
    const dish = data.find((dish) => dish.idPrato === idPrato);
    return dish ? dish.ingredientes : [];
  } catch (error) {
    toast.error('Erro ao carregar os ingredientes');
    throw error;
  }
};

const useDishIngredients = (idPrato: string) => {
  return useQuery<Ingredient[], Error>({
    queryKey: ['ingredientesPrato', idPrato],
    queryFn: () => fetchIngredientsByDishId(idPrato),
  });
};

export default useDishIngredients;
