import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartItem, Prato } from '../types/pratos';

export const useCarrinho = () => {
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);

  const adicionarAoCarrinho = async (prato: Prato) => {
    try {
      const itemExistente = carrinho.find((item) => item.id === prato.id);
      if (itemExistente) {
        setCarrinho((prevCarrinho) =>
          prevCarrinho.map((item) =>
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
        setCarrinho((prevCarrinho) => [...prevCarrinho, response.data]);
      }
      toast.success('Prato adicionado ao carrinho com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho.');
    }
  };

  return {
    carrinho,
    adicionarAoCarrinho,
  };
};
