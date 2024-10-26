import { useState, useMemo } from 'react';
import { Ingredient } from '../../services/ingredients';

const useFilteredIngredients = (ingredients: Ingredient[]) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredIngredients = useMemo(() => {
        return ingredients.filter((ingredient) =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [ingredients, searchTerm]);

    return {
        filteredIngredients,
        searchTerm,
        setSearchTerm,
    };
};

export default useFilteredIngredients;
