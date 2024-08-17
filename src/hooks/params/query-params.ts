import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

interface QueryParams {
	[key: string]: string
}

export const useQueryParams = (defaultParams?: QueryParams) => {
	const [searchParams, setSearchParams] = useSearchParams(defaultParams)

	const getQueryParam = <T extends string | number>(key: string, defaultValue?: T): T => {
		return (searchParams.get(key) || defaultValue || '') as T
	}

	const setQueryParam = useCallback(
		(key: string, value: string) => {
			const params = new URL(document.location.href).searchParams

			setSearchParams(
				() => {
					if (value) {
						params.set(key, value)
					} else {
						params.delete(key)
					}

					return params
				},
				{ replace: true }
			)
		},
		[setSearchParams]
	)

	const removeQueryParam = (key: string) => {
		const params = new URL(document.location.href).searchParams

		setSearchParams(
			() => {
				params.delete(key)
				return params
			},
			{ replace: true }
		)
	}

	const removeParams = () => {
		setSearchParams(
			(params) => {
				for (const key of params.keys()) {
					if (key !== 'section') {
						params.delete(key)
					}
				}
				return params
			},
			{ replace: true }
		)
	}

	return {
		getQueryParam,
		setQueryParam,
		removeQueryParam,
		removeParams,
		params: Object.fromEntries(searchParams.entries()),
	}
}
