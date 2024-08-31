import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Pedido {
  id?: string;
  numeroPedido: string;
  cpf: string;
  descricao: string;
  observacoes?: string;
  data: string;
  valorTotal: number;
  metodoPagamento: string;
  pratos: Array<{
    id: string;
    nome: string;
    quantidade: number;
    valor: number;
  }>;
}

export const usePedidos = () => {
  const queryClient = useQueryClient();

  // Função para buscar todos os pedidos
  const { data: pedidos = [], isLoading, error } = useQuery<Pedido[]>({
    queryKey: ['pedidos'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/pedidos');
      return response.data;
    },
  });

  // Função para adicionar um novo pedido
  const addPedidoMutation = useMutation({
    mutationFn: async (newPedido: Pedido) => {
      return axios.post('http://localhost:3000/pedidos', newPedido);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      toast.success('Pedido adicionado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar o pedido:', error);
      toast.error('Erro ao adicionar o pedido.');
    },
  });

  const addPedido = (pedido: Pedido) => {
    addPedidoMutation.mutate(pedido);
  };

  // Função para atualizar um pedido existente
  const updatePedidoMutation = useMutation({
    mutationFn: async (updatedPedido: Pedido) => {
      return axios.put(`http://localhost:3000/pedidos/${updatedPedido.id}`, updatedPedido);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      toast.success('Pedido atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar o pedido:', error);
      toast.error('Erro ao atualizar o pedido.');
    },
  });

  const updatePedido = (pedido: Pedido) => {
    updatePedidoMutation.mutate(pedido);
  };

  // Função para remover um pedido
  const removePedidoMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`http://localhost:3000/pedidos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      toast.success('Pedido removido com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover o pedido:', error);
      toast.error('Erro ao remover o pedido.');
    },
  });

  const removePedido = (id: string) => {
    removePedidoMutation.mutate(id);
  };

  return {
    pedidos,
    isLoading,
    error,
    addPedido,
    updatePedido,
    removePedido,
  };
};
