import { FC } from 'react'
import { PageLayout } from '../../../layouts/page-layout'
import AdminOrder from '../../../components/order/admin'
import { TitlePage } from '../../home/styles'
import { adminRoles } from '../../../utils/auth'
import { withAuthentication } from '../../../hocs/authentication/with-authentication'

const PedidosAdmin: FC = () => {
	return (
		<PageLayout title="Pedidos">
			<TitlePage>Pedidos</TitlePage>
			<AdminOrder />
		</PageLayout>
	)
}

export default withAuthentication(PedidosAdmin, adminRoles);
