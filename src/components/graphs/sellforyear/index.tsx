import { FC, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Box, Grid, MenuItem } from '@mui/material'
import { FormControl, InputLabel, Select } from '../../menu-filter/styles'
import { useYearlySalesData } from '../../../hooks/charts/use-sell-for-eyear'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const SellYearGraph: FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const data = useYearlySalesData(selectedYear)

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            if (typeof value === 'number') return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            return value
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
          <FormControl variant='filled' fullWidth>
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

export default SellYearGraph