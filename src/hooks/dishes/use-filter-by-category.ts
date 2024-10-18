import { useCallback } from 'react';
import { Dishe } from '../../types/dishes';
import useCategoryById from '../category/use-category-by-id';

const useFilterDishesByCategory = (dishes: Dishe[], category: string): Dishe[] => {
  const getCategoryNameById = useCallback(
    (categoryId: number): string | null => {
      const { data: categoryData, isLoading, error } = useCategoryById(categoryId);

      if (isLoading) return 'Carregando...';
      if (error) return 'Erro ao buscar categoria';
      return categoryData ? categoryData.name : null;
    },
    []
  );
  const filteredDishes = useCallback((): Dishe[] => {
    if (!category) return dishes;

    return dishes.filter(dish => {
      const categoryName = getCategoryNameById(dish.categoryId);
      return categoryName === category;
    });
  }, [dishes, category, getCategoryNameById]);

  return filteredDishes();
};

export default useFilterDishesByCategory;
