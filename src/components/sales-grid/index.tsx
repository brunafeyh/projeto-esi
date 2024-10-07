import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useOrders } from '../../hooks/order/use-orders';
import { Box } from './styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DishSale {
    name: string;
    quantity: number;
}

interface SalesPerDish {
    [key: number]: DishSale;
}

const SalesLeaders: React.FC = () => {
    const { orders } = useOrders();
    const [topDishes, setTopDishes] = useState<DishSale[]>([]);

    useEffect(() => {
        const calculateTopDishes = () => {
            const sales: SalesPerDish = {};

            orders.forEach((order) => {
                order.pratos.forEach((orderedDish) => {
                    const dishId = Number(orderedDish.id);

                    if (sales[dishId]) {
                        sales[dishId].quantity += orderedDish.quantidade;
                    } else {
                        sales[dishId] = {
                            name: orderedDish.nome,
                            quantity: orderedDish.quantidade,
                        };
                    }
                });
            });

            const sortedSales = Object.values(sales)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5);

            setTopDishes(sortedSales);
        };

        if (orders.length) {
            calculateTopDishes();
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
