import { CartItem } from "../types/dishes";
import { Pedido } from "../types/order";

export const calculateTotalAmount = (cartItems: CartItem[]): number =>
  cartItems.reduce((total, item) => total + (item.valorTotal || 0), 0);

export const calculateDiscountValue = (pointsToUse: number): number => pointsToUse * 0.01;

export const calculateFinalValue = (totalAmount: number, discountValue: number): number =>
  totalAmount - discountValue;

export const calculatePointsEarned = (cartItems: CartItem[]): number =>
  cartItems.reduce((total, item) => total + (item.valorPontos || 0), 0);

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
    descricao: cartItems.map(item => item.nome).join(', '),
    observacoes: '',
    data: new Date().toISOString().split('T')[0],
    valorTotal: finalValue,
    metodoPagamento: paymentMethod,
    pratos: cartItems.map(item => ({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      valorReais: item.valorReais,
      valorPontos: item.valorPontos,
      categoria: item.categoria,
      img: item.img,
      imgFile: item.imgFile,
      quantidade: item.quantidade,
      valor: item.valor,
    })),
  };
};
