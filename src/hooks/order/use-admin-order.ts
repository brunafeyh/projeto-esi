import { useState } from 'react'
import { useOrders } from './use-orders'
import { useOrderMutations } from './use-order-mutations'
import { useOrderFilter } from './use-order-filters'
import { Pedido } from '../../types/order'

export const useAdminOrder = () => {
  const { orders, isLoading, error } = useOrders()
  const { addOrder, updateOrder, removeOrder } = useOrderMutations()
  const [newOrder, setNewOrder] = useState<Partial<Pedido>>({
    numeroPedido: '',
    descricao: '',
    valorTotal: 0,
    metodoPagamento: '',
    data: '',
    pratos: [],
  })

  const {
    filteredPedidos,
    filterStartDate,
    filterEndDate,
    setFilterStartDate,
    setFilterEndDate,
    handleSearch,
  } = useOrderFilter(orders);

  const handleRowClick = async (id: string) => {
    try {
      const pedido = orders.find(order => order.id === id);
      if (pedido) return pedido;
      return null;
    } catch (error) {
      console.error('Erro ao buscar detalhes do pedido:', error);
      return null;
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }))
  }

  const handleAddOrder = async () => {
    try {
      addOrder(newOrder as Pedido);
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  }

  const handleUpdateOrder = async (id: string, updatedData: Partial<Pedido>) => {
    try {
      const existingOrder = orders.find(order => order.id === id);
      if (!existingOrder) return;

      const updatedOrder: Pedido = {
        ...existingOrder,
        ...updatedData,
      };

      updateOrder(updatedOrder);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  const handleRemoveOrder = async (id: string) => {
    try {
      removeOrder(id);
    } catch (error) {
      console.error('Erro ao remover pedido:', error);
    }
  };

  const resetNewOrder = () => {
    setNewOrder({
      numeroPedido: '',
      descricao: '',
      valorTotal: 0,
      metodoPagamento: '',
      data: '',
      pratos: [],
    });
  };

  return {
    orders,
    filteredPedidos,
    filterStartDate,
    filterEndDate,
    newOrder,
    setFilterStartDate,
    setFilterEndDate,
    handleSearch,
    handleRowClick,
    handleInputChange,
    handleAddOrder,
    handleUpdateOrder,
    handleRemoveOrder,
    resetNewOrder,
    isLoading,
    error,
  }
}