import { useMutation, useQueryClient } from '@tanstack/react-query'
import PontuationService, { PontuationCliente } from '../../services/pontuation'
import { toast } from 'react-toastify'

const pontuationService = new PontuationService();

export const usePontuationMutations = () => {
    const queryClient = useQueryClient()

    const updatePointsMutation = useMutation({
        mutationFn: async ({ id, pointsToAdd }: { id: string; pointsToAdd: number }) => {
            return pontuationService.updatePontuation(id, pointsToAdd);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pontuation'] });
            toast.success('Pontuação atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar a pontuação:', error);
            toast.error('Erro ao atualizar a pontuação.');
        },
    });

    const setNewPontuationMutation = useMutation({
        mutationFn: async (newClientPontuation: PontuationCliente) => {
            return pontuationService.setPontuation(newClientPontuation);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pontuation'] });
            toast.success('Nova pontuação definida com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao definir nova pontuação:', error);
            toast.error('Erro ao definir nova pontuação.');
        },
    });

    const updatePoints = (id: string, pointsToAdd: number) => {
        updatePointsMutation.mutate({ id, pointsToAdd });
    };

    const setNewPontuation = (newClientPontuation: PontuationCliente) => {
        setNewPontuationMutation.mutate(newClientPontuation);
    };

    return {
        updatePoints,
        setNewPontuation,
    };
};
