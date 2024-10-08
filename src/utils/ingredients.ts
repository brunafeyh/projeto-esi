import { Ingredient } from '../types/dishes';

export const filterIngredientsBySearchTerm = (ingredients: Ingredient[], searchTerm: string): Ingredient[] => {
  return ingredients.filter((ingredient) =>
    ingredient.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
