import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Pedido } from '../types/order';

class OrderService {
  private apiUrl: string;

  constructor(apiUrl: string = `${apiBaseUrl}/pedidos`) {
    this.apiUrl = apiUrl;
  }

  async listOrders(): Promise<Pedido[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async getOrderById(id: string): Promise<Pedido> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async addOrder(newOrder: Pedido): Promise<Pedido> {
    const response = await axios.post(this.apiUrl, newOrder);
    return response.data;
  }

  async updateOrder(updatedOrder: Pedido): Promise<Pedido> {
    const response = await axios.put(`${this.apiUrl}/${updatedOrder.id}`, updatedOrder);
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

export default OrderService
