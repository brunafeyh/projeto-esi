import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { HistoricoPedido } from '../types/dishes';
import { useAuth } from './use-auth';

const fetchHistoricoPedidos = async (cpf: string): Promise<HistoricoPedido[]> => {
    const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
    // Filter orders by the user's CPF
    const userPedidos = response.data.filter((pedido: HistoricoPedido) => pedido.cpf === cpf);
    return userPedidos.sort((a: HistoricoPedido, b: HistoricoPedido) =>
        new Date(a.data).getTime() - new Date(b.data).getTime()
    );
};

export const useCustomerOrder = () => {
    const { user } = useAuth(); // Get the logged-in user's information
    if(!user) return null
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<HistoricoPedido | null>(null);

    const { data: historicoPedidos = [], error, isLoading } = useQuery({
        queryKey: ['historicoPedidos', user?.cpf],
        queryFn: () => fetchHistoricoPedidos(user.cpf),
        enabled: !!user?.cpf, // Only run the query if the user's CPF is available
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
