import { useState, useEffect } from 'react';
import { Ingredient } from '../../types/dishes';
import { useFilterQueryParams } from '../params/use-filter';
import { filterIngredientsBySearchTerm } from '../../utils/ingredients';

const useFilteredIngredients = (ingredients: Ingredient[]) => {
  const { searchTerm, setSearchTerm } = useFilterQueryParams();
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(ingredients);

  useEffect(() => {
    const filtered = filterIngredientsBySearchTerm(ingredients, searchTerm);
    setFilteredIngredients(filtered);
  }, [ingredients, searchTerm]);

  return { filteredIngredients, searchTerm, setSearchTerm };
};

export default useFilteredIngredients;
