import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartItem, Prato as Dish } from '../types/dishes';

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading, error } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/carrinho');
      return response.data;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (newItem: CartItem) => {
      if (newItem.id && cartItems.some((item) => item.id === newItem.id)) {
        return axios.put(`http://localhost:3000/carrinho/${newItem.id}`, newItem);
      } else {
        return axios.post('http://localhost:3000/carrinho', newItem);
      }
    },
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
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const updatedItem = cartItems.find((item) => item.id === id);
      if (updatedItem) {
        const newItem = {
          ...updatedItem,
          quantidade: quantity,
          valorTotal: updatedItem.valorReais * quantity,
        };
        return axios.put(`http://localhost:3000/carrinho/${id}`, newItem);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Quantidade do item atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar a quantidade do item:', error);
      toast.error('Erro ao atualizar a quantidade do item.');
    },
  });

  const updateQuantity = (id: number, quantity: number) => {
    updateQuantityMutation.mutate({ id, quantity });
  };

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`http://localhost:3000/carrinho/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removido do carrinho com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover o item do carrinho:', error);
      toast.error('Erro ao remover o item do carrinho.');
    },
  });

  const removeItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const deletePromises = cartItems.map((item) =>
        axios.delete(`http://localhost:3000/carrinho/${item.id}`)
      );
      return Promise.all(deletePromises);
    },
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
    clearCart, // Função para limpar o carrinho
    isLoading,
    error,
  };
};
