import React from 'react'
import { Paper, Table as MuiTable, TableBody } from '@mui/material'
import {
	TableHead,
	TableRowHead,
	TableCellHead,
	TableRowBody,
	TableCellBody,
	EmptyTableTitle,
} from './styles'

export interface Column {
	field: string
	headerName: string
}

interface BusinessProposalTableProps {
	columns: Column[]
	data: Record<string, any>[]
	renderData: (row: Record<string, any>, columns: Column[]) => React.ReactNode
}

const Table: React.FC<BusinessProposalTableProps> = ({ columns, data, renderData }) => {

	return (
		<Paper elevation={0}>
			<MuiTable>
				<TableHead>
					<TableRowHead>
						{columns.map((column) => (
							<TableCellHead key={column.field}>{column.headerName}</TableCellHead>
						))}
					</TableRowHead>
				</TableHead>
				<TableBody>
					{data.length === 0 ? (
						<TableRowBody>
							<TableCellBody colSpan={columns.length}>
								<EmptyTableTitle>Não foi possível encontrar nenhum registro</EmptyTableTitle>
							</TableCellBody>
						</TableRowBody>
					) : (
						data.map((row) => renderData(row, columns))
					)}
				</TableBody>
			</MuiTable>
		</Paper>
	)
}

export default Table
