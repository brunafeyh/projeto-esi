import { useState, useEffect, useCallback } from 'react';
import { Pedido } from './use-orders';
import { useQueryParams } from './params/query-params';

interface UseOrderFilterReturn {
    filteredPedidos: Pedido[];
    filterStartDate: string;
    filterEndDate: string;
    setFilterStartDate: (date: string) => void;
    setFilterEndDate: (date: string) => void;
    setFilteredPedidos: (pedidos: Pedido[]) => void;
    handleSearch: () => void;
}

export const useOrderFilter = (orders: Pedido[]): UseOrderFilterReturn => {
    const { getQueryParam, setQueryParam } = useQueryParams();

    const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>(orders || []);
    const [filterStartDate, setFilterStartDate] = useState<string>(getQueryParam('startDate', ''));
    const [filterEndDate, setFilterEndDate] = useState<string>(getQueryParam('endDate', ''));

    const handleSetFilterStartDate = useCallback((date: string) => {
        setFilterStartDate(date);
    }, []);

    const handleSetFilterEndDate = useCallback((date: string) => {
        setFilterEndDate(date);
    }, []);

    const handleSearch = useCallback(() => {
        let filtered = orders;

        if (filterStartDate && filterEndDate) {
            filtered = orders.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate) &&
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        } else if (filterStartDate) {
            filtered = orders.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate)
            );
        } else if (filterEndDate) {
            filtered = orders.filter((pedido) =>
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        }

        setFilteredPedidos(filtered);
        setQueryParam('startDate', filterStartDate);
        setQueryParam('endDate', filterEndDate);
    }, [orders, filterStartDate, filterEndDate, setQueryParam]);

    useEffect(() => {
        handleSearch();
    }, [filterStartDate, filterEndDate, handleSearch]);

    return {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate: handleSetFilterStartDate, 
        setFilterEndDate: handleSetFilterEndDate,     
        setFilteredPedidos,
        handleSearch,
    };
};
