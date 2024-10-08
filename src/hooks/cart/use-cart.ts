import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CartService from '../../services/cart';
import { CartItem, Prato } from '../../types/dishes';

import { getCpf } from '../../utils/auth';

const cartService = new CartService();

export const useCart = () => {
  const queryClient = useQueryClient();

  const cpf = getCpf()

  const { data: cartData, isLoading, error } = useQuery({
    queryKey: ['cart', cpf],
    queryFn: () => cartService.fetchCartByCpf(cpf),
    enabled: !!cpf,
  });

  const cartItems = cartData?.items || []

  const addToCartMutation = useMutation({
    mutationFn: (newItem: CartItem) => cartService.addItemToCart(cpf, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cpf] });
      toast.success('Prato adicionado ao carrinho com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho.');
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartService.updateCartItemQuantity(cpf, itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cpf] });
      toast.success('Quantidade do item atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar a quantidade do item:', error);
      toast.error('Erro ao atualizar a quantidade do item.');
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeCartItem(cpf, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cpf] });
      toast.success('Item removido do carrinho com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover o item do carrinho:', error);
      toast.error('Erro ao remover o item do carrinho.');
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(cpf),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cpf] });
      toast.success('Carrinho limpo com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao limpar o carrinho:', error);
      toast.error('Erro ao limpar o carrinho.');
    },
  });

  const addToCart = (dish: Prato) => {
    const existingItem = cartItems.find((item) => item.id === dish.id);

    if (existingItem) {
      addToCartMutation.mutate({
        ...existingItem,
        quantidade: existingItem.quantidade + 1,
        valorTotal: existingItem.valorTotal + dish.valorReais,
      });
    } else {
      addToCartMutation.mutate({
        ...dish,
        quantidade: 1,
        valorTotal: dish.valorReais,
      });
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    updateQuantityMutation.mutate({ itemId, quantity });
  };

  const removeItem = (itemId: string) => {
    removeItemMutation.mutate(itemId);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isLoading,
    error,
  };
};
