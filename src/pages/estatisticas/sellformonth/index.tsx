import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Box, Typography } from '@mui/material';
import { usePedidos } from '../../../hooks/use-pedidos';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VendasMensais: React.FC = () => {
  const [data, setData] = useState({
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Vendas',
        data: [] as number[],
        backgroundColor: '#ff5722',
      },
    ],
  });

  const { pedidos, isLoading, error } = usePedidos();

  useEffect(() => {
    if (isLoading || !pedidos.length) return;

    const vendasPorMes = Array(12).fill(0); 

    pedidos.forEach((pedido) => {
      const mes = new Date(pedido.data).getMonth(); 
      vendasPorMes[mes] += pedido.valorTotal; 
    });

    setData({
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Vendas',
          data: vendasPorMes, 
          backgroundColor: '#ff5722',
        },
      ],
    });
  }, [pedidos, isLoading]);

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography>Erro ao carregar os dados.</Typography>;
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            if (typeof value === 'number') {
              return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box sx={{ width: '500px', height: '300px' }}>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default VendasMensais;
