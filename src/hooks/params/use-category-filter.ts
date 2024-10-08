import { useState, useEffect } from 'react';
import { useQueryParams } from './query-params';

export const useCategoryQueryParam = (defaultCategory = '') => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(getQueryParam('category', defaultCategory));

  useEffect(() => {
    setQueryParam('category', selectedCategory);
  }, [selectedCategory, setQueryParam]);

  return { selectedCategory, setSelectedCategory };
};
