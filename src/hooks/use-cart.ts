import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartItem, Prato } from '../types/dishes';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart= async (prato: Prato) => {
    try {
      const itemExistente = cart.find((item) => item.id === prato.id);
      if (itemExistente) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === prato.id
              ? { ...item, quantidade: item.quantidade + 1, valorTotal: item.valorTotal + prato.valorReais }
              : item
          )
        );
      } else {
        const response = await axios.post('http://localhost:3000/carrinho', {
          id: prato.id,
          nome: prato.nome,
          quantidade: 1,
          valorTotal: prato.valorReais,
          valorReais: prato.valorReais,
        });
        setCart((prevCart) => [...prevCart, response.data]);
      }
      toast.success('Prato adicionado ao carrinho com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho.');
    }
  };

  return {
    cart,
    addToCart,
  };
};
