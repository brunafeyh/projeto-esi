import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useOrders } from '../../../hooks/order/use-orders';
import { Box } from './styles';
import { calculateTopDishes } from '../../../utils/graph';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DishSale {
    name: string;
    quantity: number;
}

const SalesLeaders: React.FC = () => {
    const { orders } = useOrders();
    const [topDishes, setTopDishes] = useState<DishSale[]>([]);

    useEffect(() => {
        if (orders.length) {
            const sortedSales = calculateTopDishes(orders)
            setTopDishes(sortedSales);
        }
    }, [orders]);

    const data = {
        labels: topDishes.map(dish => dish.name),
        datasets: [
            {
                label: 'Quantidade Vendida',
                data: topDishes.map(dish => dish.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top 5 Most Ordered Dishes',
            },
        },
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Sales Leaders
            </Typography>
            <Bar data={data} options={options} />
        </Box>
    );
};

export default SalesLeaders