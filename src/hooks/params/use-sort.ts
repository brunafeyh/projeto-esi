import { useState, useEffect } from 'react';
import { useQueryParams } from './query-params';

export const useSortOrderQueryParam = (defaultSortOrder: 'asc' | 'desc' = 'asc') => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [sort, setSort] = useState<'asc' | 'desc'>(getQueryParam<'asc' | 'desc'>('sort', defaultSortOrder));

  useEffect(() => {
    setQueryParam('sort', sort)
  }, [sort, setQueryParam])

  return { sort, setSort }
}
