import { CartItem } from "../types/dishes";
import { Pedido } from "../types/order";

export function calculateTotalAmount(cartItems: CartItem[]): number {
  let valorTotal = 0;
  cartItems.forEach(item => {
    valorTotal += item.quantidade * item.reaisPrice;
  });
  return valorTotal;
}

export const calculateDiscountValue = (pointsToUse: number): number => pointsToUse * 0.01

export const calculateFinalValue = (totalAmount: number, discountValue: number): number =>
  totalAmount - discountValue

export const calculatePointsEarned = (cartItems: CartItem[]): number =>
  cartItems.reduce((total, item) => total + (item.pointsPrice || 0), 0)

export const createOrder = (
  cpf: string,
  cartItems: CartItem[],
  finalValue: number,
  paymentMethod: string
): Pedido => {
  return {
    id: Date.now().toString(),
    numeroPedido: `Pedido-${Date.now()}`,
    cpf,
    descricao: cartItems.map(item => item.name).join(', '),
    observacoes: '',
    data: new Date().toISOString().split('T')[0],
    valorTotal: finalValue,
    metodoPagamento: paymentMethod,
    status: 'Em Confirmação',
    pratos: cartItems.map(item => ({
      prato: {
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        reaisPrice: item.reaisPrice,
        pointsPrice: item.pointsPrice,
        reaisCostValue: item.reaisCostValue,
        image: item.image,
        isAvailable: item.isAvailable,
        categoryId: item.category.id, 
        dishIngredientFormDTOList: item.dishIngredientDTOList.map(ingredient => ({
          ingredientId: ingredient.ingredient.id,
          quantity: ingredient.quantity,
          measurementUnitId: ingredient.ingredient.measurementUnit.id,
        })),
        imgFile: null,
      },
      quantidade: item.quantidade,
    })),
  };
};
