import { useState } from 'react'
import { useOrders } from './use-orders'
import { useOrderMutations } from './use-order-mutations'
import { useOrderFilter } from './use-order-filters'
import { Pedido } from '../../types/order'
import { DEFAULT_ORDER } from '../../utils/constants/values'
import { findOrderById, mergeOrderData } from '../../utils/order'
import { useOrderById } from './use-order-by-id'

export const useAdminOrder = () => {
  const { orders, isLoading, error } = useOrders();
  const { addOrder, updateOrder, removeOrder } = useOrderMutations();
  const [newOrder, setNewOrder] = useState<Pedido>(DEFAULT_ORDER);

  const {
    filteredPedidos,
    filterStartDate,
    filterEndDate,
    setFilterStartDate,
    setFilterEndDate,
    handleSearch,
  } = useOrderFilter(orders);

  const handleRowClick = async (id: string) => {
    const { order } = useOrderById(id)
    return order
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleAddOrder = async () => {
    addOrder(newOrder)
    resetNewOrder()
  }

  const handleUpdateOrder = async (id: string, updatedData: Partial<Pedido>) => {
    const existingOrder = findOrderById(orders, id)
    if (!existingOrder) return
    const updatedOrder = mergeOrderData(existingOrder, updatedData)
    updateOrder(updatedOrder)
  }

  const handleRemoveOrder = async (id: string) => removeOrder(id)

  const resetNewOrder = () => setNewOrder(DEFAULT_ORDER);

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
