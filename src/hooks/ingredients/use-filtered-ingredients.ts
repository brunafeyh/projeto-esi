import { useState, useEffect } from 'react';
import { Ingredient } from '../../types/dishes';
import { useFilterQueryParams } from '../use-filter';

const useFilteredIngredients = (ingredients: Ingredient[]) => {
  const { searchTerm, setSearchTerm } = useFilterQueryParams();
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(ingredients)

  useEffect(() => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredIngredients(filtered)
  }, [ingredients, searchTerm])

  return { filteredIngredients, searchTerm, setSearchTerm }
}

export default useFilteredIngredients
