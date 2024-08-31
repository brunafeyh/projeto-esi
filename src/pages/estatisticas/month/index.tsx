import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { usePedidos } from '../../../hooks/use-pedidos';
import { useDishes } from '../../../hooks/use-dishes';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoriasPopulares: React.FC = () => {
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

  const { pedidos, isLoading: isLoadingPedidos, error: errorPedidos } = usePedidos();
  const { dishes, isLoading: isLoadingDishes, error: errorDishes } = useDishes();

  useEffect(() => {
    if (!isLoadingPedidos && !isLoadingDishes && pedidos && dishes) {
      const pratosMap = dishes.reduce((map: any, prato: any) => {
        map[prato.id] = prato.categoria;
        return map;
      }, {});

      const categoriasCount: { [key: string]: number } = {};
      pedidos.forEach((pedido: any) => {
        pedido.pratos.forEach((prato: any) => {
          const categoria = pratosMap[prato.id];
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
  }, [isLoadingPedidos, isLoadingDishes, pedidos, dishes]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (isLoadingPedidos || isLoadingDishes) return <Typography>Carregando...</Typography>;
  if (errorPedidos || errorDishes) return <Typography>Erro ao carregar dados.</Typography>;

  return (
    <Box sx={{ width: '200px', height: '200px' }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default CategoriasPopulares;
