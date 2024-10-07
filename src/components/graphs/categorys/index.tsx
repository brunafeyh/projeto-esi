import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box } from '@mui/material'
import { usePopularCategoriesData } from '../../../hooks/charts/use-popular-categorys'
import { FC } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend);

const PopularCategorys: FC = () => {
  const data = usePopularCategoriesData()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Box sx={{ width: '270px', height: '270px' }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default PopularCategorys;
