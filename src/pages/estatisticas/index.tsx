import { PageLayout } from '../../layouts/page-layout';
import { FC } from 'react';
import { TitlePage } from '../home/styles';
import { useAllClients } from '../../hooks/use-clients';
import { useDishes } from '../../hooks/use-dishes';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { People, RestaurantMenu } from '@mui/icons-material';
import VendasMensais from './sellformonth';
import CategoriasPopulares from './month';
import DailyStatistics from './daily';

const Estatisticas: FC = () => {
    const { allClients, isLoading: isLoadingClientes, error: errorClientes } = useAllClients();
    const { totalDishes, isLoading: isLoadingDishes, error: errorDishes } = useDishes();

    if (isLoadingClientes || isLoadingDishes) {
        return <Typography>Carregando...</Typography>;
    }

    if (errorClientes || errorDishes) {
        return <Typography>Erro ao carregar as estatísticas.</Typography>;
    }
    return (
        <PageLayout title='Estatísticas'>
            <TitlePage>
                Estatísticas
            </TitlePage>
            <Box mb={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <People sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                            <CardContent>
                                <Typography variant="subtitle1">Total de Clientes</Typography>
                                <Typography variant="h5">{allClients}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <RestaurantMenu sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                            <CardContent>
                                <Typography variant="subtitle1">Total de pratos</Typography>
                                <Typography variant="h5">{totalDishes}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <VendasMensais />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CategoriasPopulares />
                </Grid>
            </Grid>
            <DailyStatistics/>
        </PageLayout>
    );
};

export default Estatisticas;
