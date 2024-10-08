import { Pedido } from '../types/order';

export const findOrderById = (orders: Pedido[], id: string): Pedido | null => {
  return orders.find(order => order.id === id) || null;
};

export const mergeOrderData = (existingOrder: Pedido, updatedData: Partial<Pedido>): Pedido => {
  return {
    ...existingOrder,
    ...updatedData,
  };
};
