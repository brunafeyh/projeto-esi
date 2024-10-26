import { useQuery } from '@tanstack/react-query'
import UnitService, { Unit, PaginatedResponse } from '../../services/unit'

const unitService = new UnitService()

export const usePaginatedUnits = (page: number, size: number) => {
    return useQuery<PaginatedResponse<Unit>>({
        queryKey: ['units', page, size],
        queryFn: () => unitService.fetchPaginatedUnits(page, size),
        staleTime: 5000,
    });
};
