import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from '../home/styles'
import StockTable from '../../components/tables/stock-table'
import { withAuthentication } from '../../hocs/authentication/with-authentication'
import { adminRoles } from '../../utils/auth'

const Estoque: FC = () => {
    return (
        <PageLayout title="Estoque">
            <TitlePage>Estoque</TitlePage>
            <StockTable/>
        </PageLayout>
    )
}

export default withAuthentication(Estoque, adminRoles);
