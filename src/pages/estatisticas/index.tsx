import { Typography } from '@mui/material';
import { PageLayout } from '../../layouts/page-layout';
import { FC } from 'react';
import SalesBarChart from './chart';

const Estatisticas: FC = () => {
    return (
        <PageLayout title='Estatísticas'>
            <Typography variant="h4" gutterBottom>
                Estatísticas
            </Typography>
            <SalesBarChart/>
        </PageLayout>
    );
};

export default Estatisticas;
