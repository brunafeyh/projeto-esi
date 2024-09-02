import axios from 'axios';

export interface PontuationCliente {
  cpf: string;
  nome: string;
  pontosAcumulados: number;
  id: string;
}

class PontuationService {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:3000/pontuacaoClientes') {
    this.apiUrl = apiUrl;
  }

  async getPontuation(cpf: string): Promise<PontuationCliente> {
    try {
      const response = await axios.get<PontuationCliente[]>(`${this.apiUrl}?cpf=${cpf}`);
      if (response.data.length > 0) {
        return response.data[0]; // Assuming CPF is unique and you get an array back
      } else {
        throw new Error('Pontuação não encontrada para o CPF fornecido.');
      }
    } catch (error) {
      console.error('Error fetching pontuation:', error);
      throw error;
    }
  }

  async updatePontuation(id: string, pontosAcumulados: number): Promise<PontuationCliente> {
    try {
      const response = await axios.patch<PontuationCliente>(`${this.apiUrl}/${id}`, { pontosAcumulados });
      return response.data;
    } catch (error) {
      console.error('Error updating pontuation:', error);
      throw error;
    }
  }

  async setPontuation(newClientPontuation: PontuationCliente): Promise<PontuationCliente> {
    try {
      const response = await axios.post<PontuationCliente>(`${this.apiUrl}`, newClientPontuation);
      return response.data;
    } catch (error) {
      console.error('Error setting pontuation:', error);
      throw error;
    }
  }
}

export default PontuationService;
