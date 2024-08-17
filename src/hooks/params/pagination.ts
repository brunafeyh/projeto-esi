import { useCallback } from 'react'
import { useQueryParams } from './query-params'

const PAGE_KEY = 'page'
const PAGE_SIZE_KEY = 'size'

export const usePaginationParams = () => {
	const { getQueryParam, setQueryParam } = useQueryParams()

	const page = Number(getQueryParam(PAGE_KEY, 0))
	const pageSize = Number(getQueryParam(PAGE_SIZE_KEY, 10))

	const changePage = useCallback((page: number) => {
		setQueryParam(PAGE_KEY, String(page))
	}, [])

	const changePageSize = useCallback((pageSize: number) => {
		setQueryParam(PAGE_KEY, String(0))
		setQueryParam(PAGE_SIZE_KEY, String(pageSize))
	}, [])

	return {
		page,
		pageSize,
		changePage,
		changePageSize,
	}
}
