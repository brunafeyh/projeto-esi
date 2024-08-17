import { useMemo } from 'react'
import { usePaginationParams } from './params/pagination'
import { paginateArray } from '../utils/table'

export const usePaginateArray = <T extends object>(value: T[]) => {
	const { pageSize, page } = usePaginationParams()

	return useMemo(() => paginateArray(value, pageSize, page), [value, pageSize, page])
}
