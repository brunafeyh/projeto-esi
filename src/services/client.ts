import axios from 'axios';
import { apiBaseUrl } from '../shared/api';

class ClientService {
  private apiUrl: string;

  constructor(apiUrl: string = `${apiBaseUrl}/clientes`) {
    this.apiUrl = apiUrl;
  }

  async fetchTotalClients(): Promise<number> {
    const response = await axios.get(this.apiUrl);
    return response.data.length;
  }

  async createClient(clientData: Record<string, any>): Promise<void> {
    await axios.post(this.apiUrl, clientData);
  }
}

export default ClientService;
