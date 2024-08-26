import { FC } from 'react';
import { PageLayout } from '../../../layouts/page-layout';
import { roles } from '../../../utils/auth';
import { withAuthentication } from '../../../hocs/authentication/with-authentication';
import CustomerOrder from '../../../components/order/customer/CustomerOrder';
import { TitlePage } from '../../home/styles';

const PedidosCliente: FC = () => {
    return (
        <PageLayout title="Pedidos">
			<TitlePage>Meus pedidos</TitlePage>
            <CustomerOrder />
        </PageLayout>
    );
}

export default withAuthentication(PedidosCliente, roles);
