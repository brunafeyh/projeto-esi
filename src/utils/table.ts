import { isValid, parseISO } from 'date-fns'
import { ReactNode } from 'react'
import { ChipProps, Theme } from '@mui/material'

const getStatusStyles = (theme: Theme, status: ReactNode) => {
	switch (status) {
		case 'Concluída':
			return {
				backgroundColor: theme.palette.success.light,
				color: theme.palette.success.contrastText,
				width: '100px',
			};
		case 'Em andamento':
			return {
				backgroundColor: theme.palette.warning.light,
				color: theme.palette.warning.contrastText,
				width: '120px',
			};
		case 'Negada':
			return {
				backgroundColor: theme.palette.error.light,
				color: theme.palette.error.contrastText,
				width: '80px',
			};
		case 'Cancelada':
			return {
				backgroundColor: theme.palette.grey[500],
				color: theme.palette.common.white,
				width: '90px',
			};
		default:
			return {
				backgroundColor: theme.palette.text.disabled,
				color: theme.palette.common.white,
				width: '80px',
			};
	}
};

export default getStatusStyles;

export const getStatusColor = (status: string): ChipProps['color'] => {
	switch (status) {
		case 'Em Confirmação':
			return 'warning';
		case 'Em Preparação':
			return 'info';
		case 'Cancelado':
			return 'error';
		case 'Concluído':
			return 'success';
		default:
			return 'default';
	}
};

export type FormatValueTypes = 'string' | 'date' | 'number'

export const formatValue = (value: ReactNode): ReactNode => {
	if (!value && value !== 0 && typeof value !== 'boolean') {
		return '—'
	}
	return value
}

export const paginateArray = <T>(array: T[], pageSize: number, currentPage: number) =>
	array.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

export function isDate(value: ReactNode) {
	if (typeof value === 'string') {
		const isoformat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[\+-]\d{2}:\d{2})?$/
		if (isoformat.test(value)) {
			const date = parseISO(value)
			return isValid(date)
		} else {
			return false
		}
	} else if (value instanceof Date) {
		return isValid(value)
	} else {
		return false
	}
}

export function isValidDate(value: ReactNode) {
	return typeof value === 'string' || value instanceof Date
}
