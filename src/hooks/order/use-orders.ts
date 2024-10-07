import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Pedido } from '../../types/order';
import OrderService from '../../services/order';

const service = new OrderService()

export const useOrders = () => {
  const { data: orders = [], isLoading, error } = useQuery<Pedido[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await service.listOrders()
      } catch (error) {
        toast.error('Erro ao carregar os pedidos: ' + error);
        throw error;
      }
    },
  });

  return {
    orders,
    isLoading,
    error,
  };
};
