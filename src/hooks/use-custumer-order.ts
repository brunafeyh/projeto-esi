import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { HistoricoPedido } from '../types/dishes';


export const useCustomerOrder = () => {
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<HistoricoPedido | null>(null);

    useEffect(() => {
        const fetchHistoricoPedidos = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
                const sortedData = response.data.sort((a: HistoricoPedido, b: HistoricoPedido) =>
                    new Date(a.data).getTime() - new Date(b.data).getTime()
                );
                setHistoricoPedidos(sortedData);
                setFilteredPedidos(sortedData);
            } catch (error) {
                console.error('Erro ao buscar histórico de pedidos:', error);
            }
        };

        fetchHistoricoPedidos();
    }, []);

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
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        handleRowClick,
        handleCloseModal,
    };
};
