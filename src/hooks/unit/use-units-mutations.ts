import { useMutation, useQueryClient } from '@tanstack/react-query';
import UnitService, { Unit } from '../../services/unit';
import { toast } from 'react-toastify';

const unitService = new UnitService();

export const useUnitMutations = () => {
    const queryClient = useQueryClient();

    const addUnitMutation = useMutation({
        mutationFn: async (newUnit: Omit<Unit, 'id'>) => {
            return unitService.addUnit(newUnit);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] });
            toast.success('Unidade adicionada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao adicionar unidade:', error);
            toast.error('Erro ao adicionar unidade.');
        },
    });

    const updateUnitMutation = useMutation({
        mutationFn: async (updatedUnit: Unit) => {
            return unitService.updateUnit(updatedUnit);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] });
            toast.success('Unidade atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar unidade:', error);
            toast.error('Erro ao atualizar unidade.');
        },
    });

    const deleteUnitMutation = useMutation({
        mutationFn: async (id: number) => {
            return unitService.deleteUnit(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['units'] });
            toast.success('Unidade excluída com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao excluir unidade:', error);
            toast.error('Erro ao excluir unidade.');
        },
    });

    const addUnit = (newUnit: Omit<Unit, 'id'>) => {
        addUnitMutation.mutate(newUnit);
    };

    const updateUnit = (updatedUnit: Unit) => {
        updateUnitMutation.mutate(updatedUnit);
    };

    const deleteUnit = (id: number) => {
        deleteUnitMutation.mutate(id);
    };

    return {
        addUnit,
        updateUnit,
        deleteUnit,
    };
};
