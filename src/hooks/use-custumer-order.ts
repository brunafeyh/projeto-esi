import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { HistoricoPedido } from '../types/dishes';

const fetchHistoricoPedidos = async (): Promise<HistoricoPedido[]> => {
    const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
    return response.data.sort((a: HistoricoPedido, b: HistoricoPedido) =>
        new Date(a.data).getTime() - new Date(b.data).getTime()
    );
};

export const useCustomerOrder = () => {
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<HistoricoPedido | null>(null);

    const { data: historicoPedidos = [], error, isLoading } = useQuery({
        queryKey: ['historicoPedidos'],
        queryFn: fetchHistoricoPedidos,
    });

    useEffect(() => {
        if (historicoPedidos) {
            setFilteredPedidos(historicoPedidos);
        }
    }, [historicoPedidos]);

    const handleSearch = () => {
        let filtered = historicoPedidos;

        if (filterStartDate && filterEndDate) {
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate) &&
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        } else if (filterStartDate) {
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate)
            );
        } else if (filterEndDate) {
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        }

        setFilteredPedidos(filtered);
    };

    const handleRowClick = async (id: string) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/historicoPedidos/${id}`);
            setSelectedOrder(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do pedido:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return {
        historicoPedidos,
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        selectedOrder,
        isLoading,
        error,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        handleRowClick,
        handleCloseModal,
    };
};
