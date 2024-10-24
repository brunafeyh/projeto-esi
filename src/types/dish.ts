export interface MeasurementUnit {
    id: number;
    name: string;
    acronym: string;
  }
  
  export interface Ingredient {
    id: number;
    name: string;
    totalQuantityAvailable: number;
    measurementUnit: MeasurementUnit;
  }
  
  export interface DishIngredientDTO {
    id: number;
    ingredient: Ingredient;
    quantity: number;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Dish {
    id: number;
    name: string;
    description: string;
    reaisPrice: number;
    pointsPrice: number;
    reaisCostValue: number;
    image: string;
    isAvailable: boolean;
    category: Category;
    dishIngredientDTOList: DishIngredientDTO[];
  }
  