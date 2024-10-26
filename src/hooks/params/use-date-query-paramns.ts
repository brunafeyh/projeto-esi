import { useState, useCallback } from 'react';
import { useQueryParams } from './query-params';

interface UseDateQueryParamsReturn {
    filterStartDate: string;
    filterEndDate: string;
    setFilterStartDate: (date: string) => void;
    setFilterEndDate: (date: string) => void;
}

export const useDateQueryParams = (): UseDateQueryParamsReturn => {
    const { getQueryParam, setQueryParam } = useQueryParams();

    const [filterStartDate, setFilterStartDate] = useState<string>(getQueryParam('startDate', ''));
    const [filterEndDate, setFilterEndDate] = useState<string>(getQueryParam('endDate', ''));

    const handleSetFilterStartDate = useCallback((date: string) => {
        setFilterStartDate(date);
        setQueryParam('startDate', date);
    }, [setQueryParam]);

    const handleSetFilterEndDate = useCallback((date: string) => {
        setFilterEndDate(date);
        setQueryParam('endDate', date);
    }, [setQueryParam]);

    return {
        filterStartDate,
        filterEndDate,
        setFilterStartDate: handleSetFilterStartDate,
        setFilterEndDate: handleSetFilterEndDate,
    }
}
