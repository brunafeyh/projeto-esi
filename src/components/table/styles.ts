import {
	styled,
	TableCell,
	TableCellProps,
	TableHead as MuiTableHead,
	TableHeadProps,
	TablePagination as MuiTablePagination,
	TablePaginationProps,
	TableRow,
	TableRowProps,
	Typography,
	TypographyProps,
} from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const TableRowHead = styled(TableRow)<TableRowProps>(({ theme }) => ({
	height: theme.spacing(6),
}))

export const TableHead = styled(MuiTableHead)<TableHeadProps>(({ theme }) => ({
	backgroundColor: theme.palette.unioeste.neutral.p20,
	wordBreak: 'break-word',
	whiteSpace: 'normal',
	minWidth: theme.spacing(18.75),
	maxWidth: theme.spacing(31.25),
}))

export const TableCellHead = styled(TableCell)<TableCellProps>(({ theme }) => ({
	fontWeight: FONT_WEIGHTS.bold,
	color: theme.palette.unioeste.neutral.p100,
	wordBreak: 'break-word',
	whiteSpace: 'normal',
	fontSize: theme.spacing(1.5),
	minWidth: theme.spacing(18.75),
	maxWidth: theme.spacing(31.25),
}))

export const TableRowBody = styled(TableRow)<TableRowProps>(({ theme }) => ({
	height: theme.spacing(6),
}))

export const TableCellBody = styled(TableCell)(({ theme }) => ({
	fontSize: theme.spacing(1.5),
	width: '15%',
	fontWeight: FONT_WEIGHTS.regular,
}))

export const EmptyTableTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontSize: theme.spacing(2),
	fontWeight: FONT_WEIGHTS.medium,
}))

export const TablePagination = styled(MuiTablePagination)<TablePaginationProps>(({ theme }) => ({
	borderTop: 'none',
	borderBottom: 'none',
	backgroundColor: 'transparent',
	padding: theme.spacing(0),
	justifyContent: 'flex-end',
	display: 'flex',
}))
