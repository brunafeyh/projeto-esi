import { useMemo } from 'react';
import { useOrders } from '../order/use-orders';
import { formatDate } from '../../utils/graph';

interface Statistics {
    clients: number;
    orders: number;
    profit: number;
}

export const useDailyStatistics = (selectedDate: Date | null) => {
    const { orders, isLoading, error } = useOrders()

    const getFilteredOrders = () => {
        if (selectedDate) return orders.filter((order) => order.data === formatDate(selectedDate))
        return orders
    }

    const statistics = useMemo<Statistics>(() => {
        if (isLoading || !orders.length) {
            return { clients: 0, orders: 0, profit: 0 }
        }

        const filteredOrders = getFilteredOrders()
        const totalClients = new Set(filteredOrders.map((order) => order.cpf)).size
        const totalOrders = filteredOrders.length
        const totalProfit = filteredOrders.reduce((sum, order) => sum + order.valorTotal, 0)
        return {
            clients: totalClients,
            orders: totalOrders,
            profit: totalProfit,
        };
    }, [selectedDate, orders, isLoading])

    return { statistics, isLoading, error }
}
