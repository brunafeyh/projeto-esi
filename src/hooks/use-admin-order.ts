import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiBaseUrl } from '../shared/api';
import { HistoricoPedido } from '../types/pratos';

export const useAdminOrder = () => {
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const [newOrder, setNewOrder] = useState<Partial<HistoricoPedido>>({
        numeroPedido: '',
        descricao: '',
        valorReais: 0,
        valorPontos: 0,
        data: '',
        pratos: [],
    });
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
            toast.error('Erro ao buscar detalhes do pedido.');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleAddOrder = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/historicoPedidos`, newOrder);
            const updatedPedidos = [...historicoPedidos, response.data];
            setHistoricoPedidos(updatedPedidos);
            setFilteredPedidos(updatedPedidos);
            toast.success('Pedido adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
            toast.error('Erro ao adicionar pedido.');
        }
    };

    const resetNewOrder = () => {
        setNewOrder({
            numeroPedido: '',
            descricao: '',
            valorReais: 0,
            valorPontos: 0,
            data: '',
            pratos: [],
        });
    };

    return {
        historicoPedidos,
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        newOrder,
        selectedOrder,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        handleRowClick,
        handleInputChange,
        handleAddOrder,
        resetNewOrder,
    };
};
