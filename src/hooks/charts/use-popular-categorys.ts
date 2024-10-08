import { useEffect, useState } from 'react';
import { useOrders } from '../order/use-orders';
import { useDishes } from '../dishes/use-dishes';
import { BACKGROUND_COLOR_GRAPHS } from '../../utils/constants/values';
import { countCategories, mapDishesToCategories } from '../../utils/graph';

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

  const { orders } = useOrders();
  const { dishes } = useDishes();

  useEffect(() => {
    if (orders && dishes) {
      const dishesMap = mapDishesToCategories(dishes);
      const categoryCount = countCategories(orders, dishesMap);

      setData({
        labels: Object.keys(categoryCount),
        datasets: [
          {
            ...data.datasets[0],
            data: Object.values(categoryCount),
          },
        ],
      });
    }
  }, [orders, dishes]);

  return data;
};
