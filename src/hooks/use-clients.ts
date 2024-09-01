import { useQuery } from '@tanstack/react-query';
import ClientService from '../services/client';

const clientService = new ClientService()

export const useAllClients = () => {
  const { data: allClients = 0, error, isLoading } = useQuery({
    queryKey: ['allClients'],
    queryFn: () => clientService.fetchTotalClients(),
  });

  return { allClients, error, isLoading };
};
