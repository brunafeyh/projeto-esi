import axios from 'axios';
import { CartItem } from '../types/dishes';

interface Cart {
  id?: string
  cpf: string
  items: CartItem[]
}

class CartService {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:3000/carrinho') {
    this.apiUrl = apiUrl;
  }

  async fetchCartByCpf(cpf: string): Promise<Cart | null> {
    try {
      const response = await axios.get<Cart[]>(`${this.apiUrl}?cpf=${cpf}`);
      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error);
      throw new Error('Erro ao buscar o carrinho.');
    }
  }

  async addItemToCart(cpf: string, newItem: CartItem): Promise<Cart> {
    try {
      const existingCart = await this.fetchCartByCpf(cpf);
  
      if (existingCart && existingCart.id) {
        const existingItemIndex = existingCart.items.findIndex(item => item.id === newItem.id);
  
        if (existingItemIndex === -1) {
          existingCart.items.push(newItem);
        } else {
          existingCart.items[existingItemIndex] = {
            ...existingCart.items[existingItemIndex],
            quantidade: existingCart.items[existingItemIndex].quantidade + newItem.quantidade,
            valorTotal: existingCart.items[existingItemIndex].valorTotal + newItem.valorTotal,
          };
        }
        const response = await axios.put(`${this.apiUrl}/${existingCart.id}`, existingCart);
        return response.data
      } else {
        const newCart: Cart = {
          cpf,
          items: [newItem],
        };
        const response = await axios.post(this.apiUrl, newCart);
        if (response.data && response.data.id) {
          return { ...newCart, id: response.data.id }
        } else {
          console.error('Erro: O ID do carrinho não foi retornado pelo servidor.');
        }
        return newCart as Cart
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      throw new Error('Erro ao adicionar item ao carrinho.');
    }
  }

  async updateCartItemQuantity(cpf: string, itemId: string, quantity: number): Promise<Cart> {
    const existingCart = await this.fetchCartByCpf(cpf);

    if (existingCart && existingCart.id) {
      const itemIndex = existingCart.items.findIndex(item => item.id === itemId);

      if (itemIndex >= 0) {
        existingCart.items[itemIndex] = {
          ...existingCart.items[itemIndex],
          quantidade: quantity,
          valorTotal: existingCart.items[itemIndex].valorReais * quantity,
        };

        const response = await axios.put(`${this.apiUrl}/${existingCart.id}`, existingCart);
        return response.data;
      }
    }

    throw new Error('Item não encontrado no carrinho.');
  }

  async removeCartItem(cpf: string, itemId: string): Promise<void> {
    const existingCart = await this.fetchCartByCpf(cpf);

    if (existingCart && existingCart.id) {
      existingCart.items = existingCart.items.filter(item => item.id !== itemId);
      await axios.put(`${this.apiUrl}/${existingCart.id}`, existingCart);
    } else {
      throw new Error('Carrinho não encontrado.');
    }
  }

  async clearCart(cpf: string): Promise<void> {
    const existingCart = await this.fetchCartByCpf(cpf);

    if (existingCart && existingCart.id) {
      existingCart.items = [];
      await axios.put(`${this.apiUrl}/${existingCart.id}`, existingCart);
    }
  }
}

export default CartService
