export interface Prato {
	id: number;
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