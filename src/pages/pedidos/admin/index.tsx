import { FC } from 'react'
import Table, { Column } from '../../../components/table'
import { usePaginateArray } from '../../../hooks/use-paginate-array'
import { PageLayout } from '../../../layouts/page-layout'
import { TableRowBody } from '../../../components/table/styles'
import { TableCell } from '../../../components/table-cell-business-proposal'

const Pedidos = [
	{
		id: 1,
		number: '001',
		date: '2024-08-17',
		descrition: 'Combo Shawarma',
		observation: 'none',
		value: 'R$ 30,00',
	},
	{
		id: 2,
		number: '001',
		date: '2024-08-17',
		descrition: 'Combo Shawarma',
		observation: 'none',
		value: 'R$ 30,00',
	},
]

const columns: Column[] = [
	{ field: 'number', headerName: 'Nº Pedido' },
	{ field: 'date', headerName: 'Data' },
	{ field: 'descrition', headerName: 'Descrição' },
	{ field: 'observation', headerName: 'Observação' },
	{ field: 'value', headerName: 'Valor' },
]

const PedidosAdmin: FC = () => {
	const paginatedArray = usePaginateArray(Pedidos)
	
	return (
		<PageLayout title="Pedidos">
			<Table
				columns={columns}
				data={paginatedArray}
				renderData={(row) => (
					<TableRowBody key={row.id}>
						<TableCell>{row.number}</TableCell>
						<TableCell>{row.date}</TableCell>
						<TableCell>{row.descrition}</TableCell>
						<TableCell>{row.observation}</TableCell>
						<TableCell>{row.value}</TableCell>
					</TableRowBody>
				)}
			/>
		</PageLayout>
	)
}

export default PedidosAdmin
