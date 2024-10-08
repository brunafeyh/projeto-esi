import { useState, useEffect, useCallback } from 'react';
import { Pedido } from '../../types/order';
import { useDateQueryParams } from '../params/use-date-query-paramns';

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
    const {
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate
    } = useDateQueryParams();

    const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>(orders || []);

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
    }, [orders, filterStartDate, filterEndDate]);

    useEffect(() => {
        handleSearch();
    }, [filterStartDate, filterEndDate, handleSearch]);

    return {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        setFilteredPedidos,
        handleSearch,
    };
}