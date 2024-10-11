import { FC, ReactNode } from 'react'
import { TableCellProps } from '@mui/material'
import { TableCellBody } from '../table/styles'
import { formatValue } from '../../../utils/table'

interface Props extends TableCellProps {
    children: ReactNode
}

export const TableCell: FC<Props> = ({ children }) => {
    return <TableCellBody>{formatValue(children)}</TableCellBody>;
}
