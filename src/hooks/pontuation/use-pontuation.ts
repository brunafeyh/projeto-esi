import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PontuationService, { PontuationCliente } from '../../services/pontuation';

const pontuationService = new PontuationService();

export const usePontuation = (cpf: string) => {
  const { data: pontuation = null, isLoading, error } = useQuery<PontuationCliente | null>({
    queryKey: ['pontuation', cpf],
    queryFn: async () => {
      try {
        return await pontuationService.getPontuation(cpf);
      } catch (error) {
        toast.error('Erro ao carregar a pontuação: ' + error);
        throw error;
      }
    },
    enabled: !!cpf, 
  });

  return {
    pontuation,
    isLoading,
    error,
  };
};
