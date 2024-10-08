import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Pedido } from '../../types/order';
import OrderService from '../../services/order';

const service = new OrderService();

export const useOrderById = (id: string) => {
  const { data: order, isLoading, error } = useQuery<Pedido>({
    queryKey: ['order', id],
    queryFn: async () => {
      try {
        return await service.getOrderById(id);
      } catch (error) {
        toast.error('Erro ao carregar o pedido: ' + error);
        throw error;
      }
    }
  })

  return {
    order,
    isLoading,
    error,
  }
}
