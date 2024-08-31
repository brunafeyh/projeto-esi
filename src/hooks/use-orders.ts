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

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery<Pedido[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/pedidos');
      return response.data;
    },
  });

  const addOrderMutation = useMutation({
    mutationFn: async (newPedido: Pedido) => {
      return axios.post('http://localhost:3000/pedidos', newPedido);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido adicionado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar o pedido:', error);
      toast.error('Erro ao adicionar o pedido.');
    },
  });

  const addOrder = (pedido: Pedido) => {
    addOrderMutation.mutate(pedido);
  };

  const updateOrderMutation = useMutation({
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

  const updateOrder = (pedido: Pedido) => {
    updateOrderMutation.mutate(pedido);
  };

  const removeOrderMutation = useMutation({
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

  const removeOrder = (id: string) => {
    removeOrderMutation.mutate(id);
  };

  return {
    orders,
    isLoading,
    error,
    addOrder,
    updateOrder,
    removeOrder,
  };
};
