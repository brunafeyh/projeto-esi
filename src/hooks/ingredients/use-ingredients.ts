import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import IngredientService, { Ingredient } from '../../services/ingredients';

const ingredientService = new IngredientService();

const useIngredients = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const queryClient = useQueryClient();  

    const { data: ingredients = [], isLoading, isError } = useQuery<Ingredient[]>({
        queryKey: ['ingredients'],
        queryFn: () => ingredientService.fetchIngredients(),  
    });

    const filteredIngredients = ingredients.filter((ingredient) =>
        (ingredient.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addIngredientMutation = useMutation({
        mutationFn: (newIngredient: Partial<Ingredient>) => {
            if (!newIngredient.measurementUnitId) {
                throw new Error('Measurement unit ID is required');
            }
            return ingredientService.createIngredient(
                newIngredient.name!, 
                newIngredient.totalQuantityAvailable!, 
                newIngredient.measurementUnitId
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            toast.success('Ingrediente adicionado com sucesso!');  
        },
        onError: (error) => {
            toast.error('Erro ao adicionar o ingrediente: ' + error.message); 
        },
    });

    const updateIngredientMutation = useMutation({
        mutationFn: ({ id, updatedData }: { id: number; updatedData: Partial<Ingredient> }) => {
            if (!updatedData.measurementUnitId) {
                throw new Error('Measurement unit ID is required');
            }
            return ingredientService.updateIngredient(
                id, 
                updatedData.name!, 
                updatedData.totalQuantityAvailable!, 
                updatedData.measurementUnitId 
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            toast.success('Ingrediente atualizado com sucesso!'); 
        },
        onError: (error) => {
            toast.error('Erro ao atualizar o ingrediente: ' + error.message); 
        }
    });

    const deleteIngredientMutation = useMutation({
        mutationFn: (id: number) => ingredientService.deleteIngredient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] }); 
            toast.success('Ingrediente excluído com sucesso!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir o ingrediente: ' + error.message); 
        },
    });

    const transformedIngredients = filteredIngredients.map(ingredient => ({
        ...ingredient,
        measurementUnitId: ingredient.measurementUnit?.id, 
    }));

    return {
        ingredients: transformedIngredients,
        searchTerm,
        setSearchTerm, 
        addIngredient: addIngredientMutation.mutate,
        updateIngredient: updateIngredientMutation.mutate,
        deleteIngredient: deleteIngredientMutation.mutate, 
        isLoading, 
        isError,
    };
};

export default useIngredients;
