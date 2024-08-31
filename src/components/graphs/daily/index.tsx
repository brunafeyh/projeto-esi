import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { People, Receipt, Star } from '@mui/icons-material';
import { useOrders } from '../../../hooks/use-orders';
import { formatDate } from '../../../utils/graph';

const DailyStatistics: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [statistics, setStatistics] = useState({
        clients: 0,
        orders: 0,
        profit: 0,
    });

    const { orders, isLoading, error } = useOrders();

    useEffect(() => {
        if (isLoading || !orders.length) return;

        const filteredOrders = selectedDate
            ? orders.filter((order) => order.data === formatDate(selectedDate))
            : orders;

        const totalClients = new Set(filteredOrders.map((order) => order.cpf)).size;
        const totalOrders = filteredOrders.length;
        const totalProfit = filteredOrders.reduce(
            (sum, order) => sum + order.valorTotal,
            0
        );

        setStatistics({
            clients: totalClients,
            orders: totalOrders,
            profit: totalProfit,
        });
    }, [selectedDate, orders, isLoading]);

    if (isLoading) {
        return <Typography>Carregando...</Typography>;
    }

    if (error) {
        return <Typography>Erro ao carregar as estatísticas.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Estatísticas do dia:
            </Typography>
            <Box sx={{ mt: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Data"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <People sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Clientes atendidos</Typography>
                                        <Typography variant="h5">{statistics.clients}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Receipt sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Pedidos</Typography>
                                        <Typography variant="h5">{statistics.orders}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Star sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Lucro</Typography>
                                        <Typography variant="h5">
                                            {statistics.profit.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DailyStatistics;
