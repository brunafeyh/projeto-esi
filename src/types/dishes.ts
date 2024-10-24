import { z } from 'zod';
import { Dish } from './dish';

export interface DishValueForm {
	id: string;
	name: string;
	description: string;
	reaisPrice: number;
	pointsPrice: number;
	reaisCostValue: number;
	image: string;
	isAvailable: boolean
	categoryId: number
	dishIngredientFormDTOList: Array<{
		ingredientId: number
		quantity: number
		measurementUnitId: number;
	}>;
	imgFile?: FileList | null
}
  

export interface CartItem extends Dish {
	quantidade: number;
	valorTotal: number;
}

export interface Ingredient {
	id: string;
	nome: string;
	quantidade: string;
}

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  totalQuantityAvailable: z.number().min(1, 'Quantidade é obrigatória'),
  measurementUnitId: z.number().min(1, 'Unidade de Medida é obrigatória'),
});

export type IngredientFormInputs = z.infer<typeof ingredientSchema>;


export interface IngredientesPrato {
	idPrato: string;
	ingredientes: Ingredient[];
}