import { useEffect, useState } from 'react'
import { useOrders } from '../order/use-orders'
import { BACKGROUND_COLOR_GRAPHS } from '../../utils/constants/values';
import { useDishes } from '../dishes/use-dishes';

export const usePopularCategoriesData = () => {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Categorias Populares',
        data: [] as number[],
        backgroundColor: BACKGROUND_COLOR_GRAPHS,
        hoverOffset: 4,
      },
    ],
  });

  const { orders } = useOrders()
  const { dishes } = useDishes()

  useEffect(() => {
    if (orders && dishes) {
      const dishesMap = dishes.reduce((map: any, dishe: any) => {
        map[dishe.id] = dishe.categoria
        return map
      }, {})

      const categoriasCount: { [key: string]: number } = {};
      orders.forEach((order: any) => {
        order.pratos.forEach((prato: any) => {
          const categoria = dishesMap[prato.id]
          if (categoria) {
            categoriasCount[categoria] = (categoriasCount[categoria] || 0) + prato.quantidade
          }
        })
      })

      setData({
        labels: Object.keys(categoriasCount),
        datasets: [
          {
            ...data.datasets[0],
            data: Object.values(categoriasCount),
          },
        ],
      })
    }
  }, [orders, dishes])

  return data
}
