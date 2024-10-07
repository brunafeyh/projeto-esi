import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from '../home/styles'
import StockTable from '../../components/stock-table'

const Estoque: FC = () => {
    return (
        <PageLayout title="Estoque">
            <TitlePage>Estoque</TitlePage>
            <StockTable/>
        </PageLayout>
    )
}

export default Estoque
