import { useMemo } from 'react';
import { useDishes } from './use-dishes';
import { useCategoryQueryParam } from '../params/use-category-filter';
import { useSortOrderQueryParam } from '../params/use-sort';
import { useFilterQueryParams } from '../params/use-filter';
import { filterDishesByCategory, filterDishesBySearchTerm, sortDishesByPrice } from '../../utils/dishe';
import { useCart } from '../cart/use-cart';

export const useFilteredDishes = () => {
  const { dishes, isLoading, error } = useDishes();
  const { cartItems, addToCart } = useCart();
  const { searchTerm, setSearchTerm } = useFilterQueryParams();
  const { selectedCategory, setSelectedCategory } = useCategoryQueryParam();
  const { sort, setSort } = useSortOrderQueryParam();

  const filteredDishes = useMemo(() => {
    let result = filterDishesBySearchTerm(dishes, searchTerm);
    result = filterDishesByCategory(result, selectedCategory);
    result = sortDishesByPrice(result, sort);
    return result;
  }, [dishes, searchTerm, sort, selectedCategory]);

  return {
    dishes,
    cartItems,
    searchTerm,
    sort,
    selectedCategory,
    setSearchTerm,
    setSort,
    setSelectedCategory,
    addToCart,
    filteredDishes,
    isLoading,
    error,
  };
};
