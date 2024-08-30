import { PageLayout } from '../../layouts/page-layout';
import { FC } from 'react';
import SalesBarChart from './chart';
import { TitlePage } from '../home/styles';

const Estatisticas: FC = () => {
    return (
        <PageLayout title='Estatísticas'>
            <TitlePage >
                Estatísticas
            </TitlePage>
            <SalesBarChart/>
        </PageLayout>
    );
};

export default Estatisticas;
