import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import IngredientService from '../services/ingredients';
import { Ingredient } from '../types/dishes';

const ingredientService = new IngredientService()

const useIngredients = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const queryClient = useQueryClient();

    const { data: ingredients = [], isLoading, isError } = useQuery<Ingredient[]>({
        queryKey: ['ingredients'],
        queryFn: () => ingredientService.fetchIngredients(),
        staleTime: 1000 * 60 * 5,
    });

    const filteredIngredients = ingredients.filter(ingredient =>
        (ingredient.nome || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateIngredientMutation = useMutation({
        mutationFn: ({ id, updatedData }: { id: string; updatedData: Partial<Ingredient> }) =>
            ingredientService.updateIngredient(id, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            toast.success('Ingrediente atualizado com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao atualizar o ingrediente.');
        },
    });

    const deleteIngredientMutation = useMutation({
        mutationFn: (id: string) => ingredientService.deleteIngredient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            toast.success('Ingrediente excluído com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao excluir o ingrediente.');
        },
    });

    return {
        ingredients: filteredIngredients,
        searchTerm,
        setSearchTerm,
        updateIngredient: updateIngredientMutation.mutate,
        deleteIngredient: deleteIngredientMutation.mutate,
        isLoading,
        isError,
    };
};

export default useIngredients;
