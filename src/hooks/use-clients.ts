import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClientService from '../services/client';

const clientService = new ClientService();

export const useAllClients = () => {
  const queryClient = useQueryClient();

  const { data: allClients = 0, error } = useQuery({
    queryKey: ['allClients'],
    queryFn: () => clientService.fetchTotalClients(),
  });

  const { mutate: createClient, error: createError } = useMutation({
    mutationFn: (newClient: Record<string, any>) => clientService.createClient(newClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allClients'] });
    },
  });

  return { allClients, error, createClient, createError};
};
