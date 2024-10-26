import { useMemo } from 'react';
import { useOrders } from '../order/use-orders';
import { MONTHS } from '../../utils/constants/values';
import { calculateMonthlySales } from '../../utils/graph';

export const useYearlySalesData = (selectedYear: number) => {
  const { orders } = useOrders()

  const salesData = useMemo(() => {
    const vendasPorMes = calculateMonthlySales(orders, selectedYear)

    return {
      labels: MONTHS,
      datasets: [
        {
          label: 'Vendas',
          data: vendasPorMes,
          backgroundColor: '#ff5722',
        },
      ],
    };
  }, [orders, selectedYear])

  return salesData
}
