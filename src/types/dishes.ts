import { z } from 'zod';

export interface Prato {
	id: string;
	nome: string;
	descricao: string;
	valorReais: number;
	valorPontos: number;
	categoria: string;
	img: string;
}

export interface CartItem extends Prato {
	quantidade: number;
	valorTotal: number;
}

export interface Ingredient {
    id: string;
    nome: string;
    quantidade: string;
}

export const ingredientSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  quantidade: z.string().min(1, 'Quantidade é obrigatória'),
});

export type IngredientFormInputs = z.infer<typeof ingredientSchema>;

export interface IngredientesPrato {
    idPrato: string;
    ingredientes: Ingredient[];
}