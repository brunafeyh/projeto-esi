export type Pedido = {
    id?: string
    numeroPedido: string
    cpf: string
    descricao: string
    observacoes?: string
    data: string
    valorTotal: number
    metodoPagamento: string
    pratos: Array<{
      id: string
      nome: string
      quantidade: number
      valor: number
    }>
  }