import { FC } from 'react';
import { PageLayout } from '../../../layouts/page-layout';
import { roles } from '../../../utils/auth';
import { withAuthentication } from '../../../hocs/authentication/with-authentication';
import CustomerOrder from '../../../components/order/customer';
import { TitlePage } from '../../home/styles';

const ClientOrders: FC = () => {
    return (
        <PageLayout title="Pedidos">
			<TitlePage>Meus pedidos</TitlePage>
            <CustomerOrder />
        </PageLayout>
    );
}

export default withAuthentication(ClientOrders, roles);
