import { FC, ReactNode } from 'react'
import { TableCellProps } from '@mui/material'
import { format, isDate } from 'date-fns'
import { StatusCell } from './styles'
import { TableCellBody } from '../table/styles'
import StatusBox from './box-status'
import { formatValue, isValidDate } from '../../utils/table'

interface Props extends TableCellProps {
	children: ReactNode
}

export const TableCell: FC<Props> = ({ children }) => {
	if (children === 'Concluída' || children === 'Em andamento' || children === 'Negada' || children === 'Cancelada') {
		return (
			<StatusCell>
				<StatusBox status={children}>{children}</StatusBox>
			</StatusCell>
		)
	}
	if (isDate(children) && isValidDate(children)) {
		const date = new Date(children)
		return <TableCellBody>{format(date, 'dd/MM/yyyy')}</TableCellBody>
	}
	return <TableCellBody>{formatValue(children)}</TableCellBody>
}
