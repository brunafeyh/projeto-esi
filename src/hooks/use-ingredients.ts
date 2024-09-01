import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Ingredient {
    id: string;
    nome: string;
    quantidade: string;
}

const useIngredients = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const queryClient = useQueryClient();

    const fetchIngredients = async (): Promise<Ingredient[]> => {
        const response = await axios.get('http://localhost:3000/ingredientes');
        return response.data;
    };

    const { data: ingredients = [], isLoading, isError } = useQuery<Ingredient[]>({
        queryKey: ['ingredients'],
        queryFn: fetchIngredients,
        staleTime: 1000 * 60 * 5,
    });

    const filteredIngredients = ingredients.filter(ingredient =>
        (ingredient.nome || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateIngredient = useMutation({
        mutationFn: async ({ id, updatedData }: { id: string; updatedData: Partial<Ingredient> }) => {
            await axios.put(`http://localhost:3000/ingredientes/${id}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            toast.success('Ingrediente atualizado com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao atualizar o ingrediente.');
        },
    });

    const deleteIngredient = useMutation({
        mutationFn: async (id: string) => {
            await axios.delete(`http://localhost:3000/ingredientes/${id}`);
        },
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
        updateIngredient: updateIngredient.mutate,
        deleteIngredient: deleteIngredient.mutate,
        isLoading,
        isError,
    };
};

export default useIngredients;
