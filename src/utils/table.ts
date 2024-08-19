import { Theme } from '@mui/material/styles'
import { isValid, parseISO } from 'date-fns'
import { ReactNode } from 'react'

interface StyleAttributes {
	backgroundColor: string
	color: string
	width: string
}

const getStatusStyles = (theme: Theme, status: ReactNode): StyleAttributes => {
	let styles: StyleAttributes = {
		backgroundColor: 'transparent',
		color: 'inherit',
		width: 'inherit',
	}

	switch (status) {
		case 'Concluída':
		case 'Em andamento':
			styles.backgroundColor = theme.palette.unioeste.success.p10 || 'transparent'
			styles.color = theme.palette.unioeste.success.p100 || 'inherit'
			styles.width = status === 'Concluída' ? theme.spacing(11) : theme.spacing(16)
			break
		case 'Cancelada':
			styles.backgroundColor = theme.palette.unioeste.error.p10 || 'transparent'
			styles.color = theme.palette.unioeste.error.p100 || 'inherit'
			styles.width = theme.spacing(11)
			break
		case 'Negada':
			styles.backgroundColor = theme.palette.unioeste.warning.p10 || 'transparent'
			styles.color = theme.palette.unioeste.warning.p100 || 'inherit'
			styles.width = theme.spacing(9)
			break
		default:
			break
	}

	return styles
}

export default getStatusStyles

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
