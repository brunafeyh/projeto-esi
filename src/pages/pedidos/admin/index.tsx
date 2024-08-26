import { FC } from 'react'
import { PageLayout } from '../../../layouts/page-layout'
import AdminOrder from './table'
import { TitlePage } from '../../home/styles'

const PedidosAdmin: FC = () => {
	return (
		<PageLayout title="Pedidos">
			<TitlePage>Pedidos</TitlePage>
			<AdminOrder/>
		</PageLayout>
	)
}

export default PedidosAdmin
