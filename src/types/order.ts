import { Prato } from "./dishes";

export type Pedido = {
  id?: string;
  numeroPedido: string;
  cpf: string;
  descricao: string;
  observacoes?: string;
  data: string;
  valorTotal: number;
  metodoPagamento: string;
  pratos: Prato[];
};