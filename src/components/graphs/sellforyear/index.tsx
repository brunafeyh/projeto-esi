import { FC, useEffect, useState } from 'react';
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
import { Box, Grid, MenuItem } from '@mui/material';
import { useOrders } from '../../../hooks/use-orders';
import { FormControl, InputLabel, Select } from '../../cardapio-filter/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SellYearGraph: FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
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

  const { orders } = useOrders();

  useEffect(() => {
    if (!orders.length) return;

    const vendasPorMes = Array(12).fill(0); 

    orders.forEach((order) => {
      const date = new Date(order.data);
      if (date.getFullYear() === selectedYear) {
        const monthIndex = date.getMonth();
        vendasPorMes[monthIndex] += order.valorTotal;
      }
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
  }, [orders, selectedYear]);

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
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <FormControl variant = 'filled' fullWidth>
            <InputLabel id="select-year-label">Ano</InputLabel>
            <Select
              labelId="select-year-label"
              value={selectedYear}
              label="Ano"
              onChange={(e) => setSelectedYear(e.target.value as number)}
            >
              {[2022, 2023, 2024, 2025].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default SellYearGraph;
