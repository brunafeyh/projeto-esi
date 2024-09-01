import { useState } from 'react';
import { toast } from 'react-toastify';
import { Pedido, useOrders } from './use-orders';

export const useAdminOrder = () => {
    const { orders, isLoading, error, addOrder, updateOrder, removeOrder } = useOrders();
    const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const [newOrder, setNewOrder] = useState<Partial<Pedido>>({
        numeroPedido: '',
        descricao: '',
        valorTotal: 0,
        metodoPagamento: '',
        data: '',
        pratos: [],
    });

    const handleSearch = () => {
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
    };

    const handleRowClick = async (id: string) => {
        try {
            const pedido = orders.find(order => order.id === id);
            if (pedido) {
                return pedido;
            } else {
                toast.error('Pedido não encontrado.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes do pedido:', error);
            toast.error('Erro ao buscar detalhes do pedido.');
            return null;
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
            await addOrder(newOrder as Pedido);
            toast.success('Pedido adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
            toast.error('Erro ao adicionar pedido.');
        }
    };

    const handleUpdateOrder = async (id: string, updatedData: Partial<Pedido>) => {
        try {
            const existingOrder = orders.find(order => order.id === id);
            if (!existingOrder) {
                toast.error('Pedido não encontrado.');
                return;
            }

            const updatedOrder: Pedido = {
                ...existingOrder,
                ...updatedData
            };

            await updateOrder(updatedOrder);
            toast.success('Pedido atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            toast.error('Erro ao atualizar pedido.');
        }
    };

    const handleRemoveOrder = async (id: string) => {
        try {
            await removeOrder(id);
            toast.success('Pedido removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover pedido:', error);
            toast.error('Erro ao remover pedido.');
        }
    };

    const resetNewOrder = () => {
        setNewOrder({
            numeroPedido: '',
            descricao: '',
            valorTotal: 0,
            metodoPagamento: '',
            data: '',
            pratos: [],
        });
    };

    return {
        orders,
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        newOrder,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        handleRowClick,
        handleInputChange,
        handleAddOrder,
        handleUpdateOrder,
        handleRemoveOrder,
        resetNewOrder,
        isLoading,
        error,
    };
};
