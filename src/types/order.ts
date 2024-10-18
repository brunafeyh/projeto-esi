import { Dishe } from "./dishes"

export type Pedido = {
  id?: string;
  numeroPedido: string;
  cpf: string;
  descricao: string;
  observacoes?: string;
  data: string;
  valorTotal: number;
  metodoPagamento: string;
  status: string;
  pratos: Array<{
    prato: Dishe;
    quantidade: number;
  }>;
};
