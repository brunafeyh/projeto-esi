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
export interface Prato {
    id: number;
    nome: string;
    quantidade: number;
    valor: number;
}
export interface HistoricoPedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
    cpf: string; // CPF do cliente
    nome: string; // Nome do cliente
    pratos?: Prato[];
}
