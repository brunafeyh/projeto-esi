import { useState, useEffect } from 'react'
import { useQueryParams } from './query-params'

export const useFilterQueryParams = (defaultSearchTerm = '') => {
    const { getQueryParam, setQueryParam } = useQueryParams()
    const [searchTerm, setSearchTerm] = useState<string>(getQueryParam('search', defaultSearchTerm))

    useEffect(() => {
        setQueryParam('search', searchTerm)
    }, [searchTerm, setQueryParam])

    return { searchTerm, setSearchTerm }
}
