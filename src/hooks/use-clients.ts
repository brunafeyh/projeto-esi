import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';

const fetchTotalClientes = async () => {
  const response = await axios.get(`${apiBaseUrl}/clientes`);
  return response.data.length;
};

export const useAllClients = () => {
  const { data: allClients = 0, error, isLoading } = useQuery({
    queryKey: ['allClients'],
    queryFn: fetchTotalClientes,
  });

  return { allClients, error, isLoading };
};
