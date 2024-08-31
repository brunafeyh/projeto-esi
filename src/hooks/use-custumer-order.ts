import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { HistoricoPedido } from '../types/dishes';
import { useAuth } from './use-auth';

const fetchHistoricoPedidos = async (cpf: string): Promise<HistoricoPedido[]> => {
    const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
    const userPedidos = response.data.filter((pedido: HistoricoPedido) => pedido.cpf === cpf);
    return userPedidos.sort((a: HistoricoPedido, b: HistoricoPedido) =>
        new Date(a.data).getTime() - new Date(b.data).getTime()
    );
};

export const useCustomerOrder = () => {
    const { user } = useAuth();
    if(!user) return null
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    const { data: historicoPedidos = [], error, isLoading } = useQuery({
        queryKey: ['historicoPedidos', user?.cpf],
        queryFn: () => fetchHistoricoPedidos(user.cpf),
        enabled: !!user?.cpf,
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

    return {
        historicoPedidos,
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        isLoading,
        error,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
    };
};
