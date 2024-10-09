import { PageLayout } from '../../layouts/page-layout';
import { FC } from 'react';
import { TitlePage } from '../home/styles';
import { useAllClients } from '../../hooks/use-clients';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { People, RestaurantMenu } from '@mui/icons-material';
import DailyStatistics from '../../components/graphs/daily';
import SellYearGraph from '../../components/graphs/sellforyear';
import PopularCategorys from '../../components/graphs/categorys';
import SalesLeaders from '../../components/graphs/sales-grid';
import { Container, GraphTypography, Stack } from './styles';
import { useDishes } from '../../hooks/dishes/use-dishes';

const Estatisticas: FC = () => {
    const { allClients, error: errorClientes } = useAllClients();
    const { totalDishes, error: errorDishes } = useDishes();

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
                <Stack>
                    <GraphTypography>Pedidos no Ano</GraphTypography>
                    <SellYearGraph />
                </Stack>
                <Grid>
                    <GraphTypography>Categorias mais vendidas</GraphTypography>
                    <PopularCategorys />
                </Grid>
            </Grid>
            <Box mb={4}>
                <Grid container spacing={2}>
                    <Grid>
                        <Container>
                            <DailyStatistics />
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SalesLeaders />
                    </Grid>
                </Grid>
            </Box>
        </PageLayout>
    );
};

export default Estatisticas;
