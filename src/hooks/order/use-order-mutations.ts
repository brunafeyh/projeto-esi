import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'
import { Pedido } from '../../types/order'
import OrderService from '../../services/order'

const service = new OrderService()

export const useOrderMutations = () => {
    const queryClient = useQueryClient()
    const addOrderMutation = useMutation({
        mutationFn: async (newPedido: Pedido
        ) => {
            return service.addOrder(newPedido)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Pedido adicionado com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao adicionar o pedido:', error);
            toast.error('Erro ao adicionar o pedido.');
        },
    })

    const updateOrderMutation = useMutation({
        mutationFn: async (updatedPedido: Pedido) => {
            return service.updateOrder(updatedPedido)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            toast.success('Pedido atualizado com sucesso!')
        },
        onError: (error) => {
            console.error('Erro ao atualizar o pedido:', error)
            toast.error('Erro ao atualizar o pedido.')
        },
    })

    const removeOrderMutation = useMutation({
        mutationFn: async (id: string) => {
            return service.deleteOrder(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Pedido removido com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao remover o pedido:', error);
            toast.error('Erro ao remover o pedido.');
        },
    })

    const addOrder = (pedido: Pedido) => {
        addOrderMutation.mutate(pedido);
    }

    const updateOrder = (pedido: Pedido) => {
        updateOrderMutation.mutate(pedido);
    }

    const removeOrder = (id: string) => {
        removeOrderMutation.mutate(id);
    }

    return {
        addOrder,
        updateOrder,
        removeOrder,
    }
}
