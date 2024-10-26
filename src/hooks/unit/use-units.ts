import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UnitService, { Unit } from '../../services/unit';

const unitService = new UnitService();

export const useUnits = () => {
    const { data: units = [], isLoading, error } = useQuery<Unit[]>({
        queryKey: ['units'],
        queryFn: async () => {
            try {
                return await unitService.fetchUnits();
            } catch (error) {
                toast.error('Erro ao carregar unidades: ' + error);
                throw error;
            }
        },
    });

    return {
        units,
        isLoading,
        error,
    };
};
