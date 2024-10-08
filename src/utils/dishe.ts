import { Prato } from "../types/dishes";
import { DEFAULT_PRATO } from "./constants/values";

export const filterDishesBySearchTerm = (dishes: Prato[], searchTerm: string): Prato[] => {
  return dishes.filter(dish => dish.nome.toLowerCase().includes(searchTerm.toLowerCase()));
};

export const filterDishesByCategory = (dishes: Prato[], category: string): Prato[] => {
  return category ? dishes.filter(dish => dish.categoria === category) : dishes;
};

export const sortDishesByPrice = (dishes: Prato[], sortOrder: 'asc' | 'desc'): Prato[] => {
  return dishes.sort((a, b) => (sortOrder === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais));
}

export const resetDish = (): Partial<Prato> => ({ ...DEFAULT_PRATO});