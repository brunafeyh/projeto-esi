import { Ingredient } from "../services/ingredients";

export const filterIngredientsBySearchTerm = (ingredients: Ingredient[], searchTerm: string): Ingredient[] => {
  return ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
