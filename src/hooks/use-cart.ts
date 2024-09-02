import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CartItem, Prato as Dish } from '../types/dishes';
import CartService from '../services/cart';

const cartService = new CartService();

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading, error } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: () => cartService.fetchCartItems(),
  });

  const addToCartMutation = useMutation({
    mutationFn: (newItem: CartItem) => cartService.addItemToCart(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Prato adicionado ao carrinho com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho.');
    },
  });

  const addToCart = (dish: Dish) => {
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

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      cartService.updateCartItemQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Quantidade do item atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar a quantidade do item:', error);
      toast.error('Erro ao atualizar a quantidade do item.');
    },
  });
  
  const updateQuantity = (id: string, quantity: number) => {
    updateQuantityMutation.mutate({ id, quantity });
  };
  
  const removeItemMutation = useMutation({
    mutationFn: (id: string) => cartService.removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removido do carrinho com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover o item do carrinho:', error);
      toast.error('Erro ao remover o item do carrinho.');
    },
  });

  const removeItem = (id: string) => {
    removeItemMutation.mutate(id);
  };

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(cartItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrinho limpo com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao limpar o carrinho:', error);
      toast.error('Erro ao limpar o carrinho.');
    },
  });

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
