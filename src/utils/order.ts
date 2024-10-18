import { CartItem } from '../types/dishes';
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


export const createOrder = (cpf: string, cartItems: CartItem[], finalValue: number, paymentMethod: string): Pedido => {
  const pratos = cartItems.map((item) => ({
    prato: {
      id: item.id,
      name: item.name,
      description: item.description,
      reaisPrice: item.reaisPrice,
      pointsPrice: item.pointsPrice,
      reaisCostValue: item.reaisCostValue,
      image: item.image,
      isAvailable: item.isAvailable,
      categoryId: item.categoryId,
      dishIngredientFormDTOList: item.dishIngredientFormDTOList,
      imgFile: item.imgFile,
    },
    quantidade: item.quantidade,
  }));

  return {
    id: undefined,
    numeroPedido: `ORD-${Date.now()}`,
    cpf,
    descricao: `Pedido para ${cpf}`,
    observacoes: undefined,
    data: new Date().toISOString(),
    valorTotal: finalValue,
    metodoPagamento: paymentMethod,
    status: 'Pendente', 
    pratos,
  };
};
