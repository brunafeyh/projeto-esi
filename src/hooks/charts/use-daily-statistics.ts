import { useMemo } from 'react';
import { useOrders } from '../order/use-orders';
import { calculateTotalClients, calculateTotalOrders, calculateTotalProfit, filterOrdersByDate } from '../../utils/graph';

interface Statistics {
  clients: number;
  orders: number;
  profit: number;
}

export const useDailyStatistics = (selectedDate: Date | null) => {
  const { orders, isLoading, error } = useOrders();

  const statistics = useMemo<Statistics>(() => {
    if (isLoading || !orders.length) {
      return { clients: 0, orders: 0, profit: 0 };
    }

    const filteredOrders = filterOrdersByDate(orders, selectedDate);
    const totalClients = calculateTotalClients(filteredOrders);
    const totalOrders = calculateTotalOrders(filteredOrders);
    const totalProfit = calculateTotalProfit(filteredOrders);

    return {
      clients: totalClients,
      orders: totalOrders,
      profit: totalProfit,
    };
  }, [selectedDate, orders, isLoading]);

  return { statistics, isLoading, error };
};
