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
    if (newItem.id) {
      const existingItem = await axios.get(`${this.apiUrl}/${newItem.id}`);
      if (existingItem.data) {
        return axios.put(`${this.apiUrl}/${newItem.id}`, newItem);
      }
    }
    return axios.post(this.apiUrl, newItem);
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem> {
    const updatedItem = await axios.get(`${this.apiUrl}/${id}`);
    const newItem = {
      ...updatedItem.data,
      quantidade: quantity,
      valorTotal: updatedItem.data.valorReais * quantity,
    };
    return axios.put(`${this.apiUrl}/${id}`, newItem);
  }

  async removeCartItem(id: number): Promise<void> {
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
