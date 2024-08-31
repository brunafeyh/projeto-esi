import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { useOrders } from '../../../hooks/use-orders';
import { useDishes } from '../../../hooks/use-dishes';

ChartJS.register(ArcElement, Tooltip, Legend);

const PopularCategorys: React.FC = () => {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Categorias Populares',
        data: [] as number[],
        backgroundColor: ['#ff5722', '#03a9f4', '#d32f2f', '#8bc34a', '#ffc107'],
        hoverOffset: 4,
      },
    ],
  });

  const { orders} = useOrders();
  const { dishes } = useDishes();

  useEffect(() => {
    if (orders && dishes) {
      const dishesMap = dishes.reduce((map: any, dishe: any) => {
        map[dishe.id] = dishe.categoria;
        return map;
      }, {});

      const categoriasCount: { [key: string]: number } = {};
      orders.forEach((orders: any) => {
        orders.pratos.forEach((prato: any) => {
          const categoria = dishesMap[prato.id];
          if (categoria) {
            if (categoriasCount[categoria]) {
              categoriasCount[categoria] += prato.quantidade;
            } else {
              categoriasCount[categoria] = prato.quantidade;
            }
          }
        });
      });

      setData({
        labels: Object.keys(categoriasCount),
        datasets: [
          {
            ...data.datasets[0],
            data: Object.values(categoriasCount),
          },
        ],
      });
    }
  }, [orders, dishes]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Box sx={{ width: '200px', height: '200px' }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default PopularCategorys;
