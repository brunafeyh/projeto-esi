import { useMemo } from 'react'
import { useOrders } from '../order/use-orders'
import { MONTHS } from '../../utils/constants/values'

export const useYearlySalesData = (selectedYear: number) => {
  const { orders } = useOrders()

  const salesData = useMemo(() => {
    const vendasPorMes = Array(12).fill(0)

    orders.forEach((order) => {
      const date = new Date(order.data)
      if (date.getFullYear() === selectedYear) {
        const monthIndex = date.getMonth()
        vendasPorMes[monthIndex] += order.valorTotal
      }
    })

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
