import axios from 'axios';
import { CartItem } from '../types/dishes';

class CartService {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:3000/carrinho') {
    this.apiUrl = apiUrl;
  }

  async fetchCartItems(): Promise<CartItem[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async addItemToCart(newItem: CartItem): Promise<CartItem> {
    try {
      const existingItemResponse = await axios.get(`${this.apiUrl}/${newItem.id}`);
      if (existingItemResponse.status === 200) {
        return this.updateCartItemQuantity(newItem.id, {
          ...existingItemResponse.data,
          quantidade: existingItemResponse.data.quantidade + newItem.quantidade,
          valorTotal: existingItemResponse.data.valorTotal + newItem.valorTotal,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const response = await axios.post(this.apiUrl, newItem);
        return response.data;
      } else {
        throw error;
      }
    }
    throw new Error('Unexpected error in addItemToCart');
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem> {
    const currentItem = await axios.get<CartItem>(`${this.apiUrl}/${id}`);
    if (currentItem.data) {
      const updatedItem: Partial<CartItem> = {
        ...currentItem.data,
        quantidade: quantity,
        valorTotal: currentItem.data.valorReais * quantity, 
      };
      const response = await axios.put(`${this.apiUrl}/${id}`, updatedItem);
      return response.data;
    } else {
      throw new Error('Item not found');
    }
  }
  

  async removeCartItem(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  async clearCart(cartItems: CartItem[]): Promise<void> {
    const deletePromises = cartItems.map((item) =>
      axios.delete(`${this.apiUrl}/${item.id}`)
    );
    await Promise.all(deletePromises);
  }
}

export default CartService;
