import { Dish } from "../types/dish";
import { DishValueForm } from "../types/dishes";
import { DEFAULT_DISHE } from "./constants/values";

export const filterDishesBySearchTerm = (dishes: Dish[], searchTerm: string): Dish[] => {
  return dishes.filter(dish => dish.name?.toLowerCase().includes(searchTerm.toLowerCase()));
};

export const filterDishesByCategory = (dishes: Dish[], category: string): Dish[] => {
  const idcategory = Number(category)
  return category ? dishes.filter(dish => dish.category.id === idcategory) : dishes;
};

export const sortDishesByPrice = (dishes: Dish[], sortOrder: 'asc' | 'desc'): Dish[] => {
  return dishes.sort((a, b) => (sortOrder === 'asc' ? a.reaisPrice - b.reaisPrice : b.reaisPrice - a.reaisPrice));
}

export const resetDish = (): Partial<DishValueForm> => ({ ...DEFAULT_DISHE });

export function transformDishToDishe(dish?: Dish): DishValueForm | undefined {
  if (!dish) return undefined
  
  return {
    id: dish.id.toString(), 
    name: dish.name,
    description: dish.description,
    reaisPrice: dish.reaisPrice,
    pointsPrice: dish.pointsPrice,
    reaisCostValue: dish.reaisCostValue,
    image: dish.image,
    isAvailable: dish.isAvailable,
    categoryId: dish.category.id, 
    dishIngredientFormDTOList: dish.dishIngredientDTOList.map(ingredientDTO => ({
      ingredientId: ingredientDTO.ingredient.id,
      quantity: ingredientDTO.quantity,
      measurementUnitId: ingredientDTO.ingredient.measurementUnit.id 
    })),
    imgFile: null 
  };
}

export function transformDishesToDishForms(dishes: Dish[]): DishValueForm[] {
  return dishes.map(dish => ({
    id: dish.id.toString(),
    name: dish.name,
    description: dish.description,
    reaisPrice: dish.reaisPrice,
    pointsPrice: dish.pointsPrice,
    reaisCostValue: dish.reaisCostValue,
    image: dish.image,
    isAvailable: dish.isAvailable,
    categoryId: dish.category.id,
    dishIngredientFormDTOList: dish.dishIngredientDTOList.map(ingredientDTO => ({
      ingredientId: ingredientDTO.ingredient.id,
      quantity: ingredientDTO.quantity,
      measurementUnitId: ingredientDTO.ingredient.measurementUnit.id,
    })),
    imgFile: null,
  }));
}