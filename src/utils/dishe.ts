import { Dishe } from "../types/dishes";
import { DEFAULT_DISHE } from "./constants/values";

export const filterDishesBySearchTerm = (dishes: Dishe[], searchTerm: string): Dishe[] => {
  return dishes.filter(dish => dish.name?.toLowerCase().includes(searchTerm.toLowerCase()));
};

export const filterDishesByCategory = (dishes: Dishe[], category: string): Dishe[] => {
  return category ? dishes.filter(dish => dish.categoryId === category) : dishes;
};

export const sortDishesByPrice = (dishes: Dishe[], sortOrder: 'asc' | 'desc'): Dishe[] => {
  return dishes.sort((a, b) => (sortOrder === 'asc' ? a.reaisPrice - b.reaisPrice : b.reaisPrice - a.reaisPrice));
}

export const resetDish = (): Partial<Dishe> => ({ ...DEFAULT_DISHE });