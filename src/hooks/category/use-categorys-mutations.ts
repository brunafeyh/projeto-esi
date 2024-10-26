import { useMutation, useQueryClient } from '@tanstack/react-query';
import CategoryService, { Category } from '../../services/category';
import { toast } from 'react-toastify';

const categoryService = new CategoryService();

export const useCategoryMutations = () => {
    const queryClient = useQueryClient();
    const addCategoryMutation = useMutation({
        mutationFn: async (newCategory: string) => {
          return categoryService.addCategory(newCategory)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['categories'] });
          toast.success('Categoria adicionada com sucesso!');
        },
        onError: (error) => {
          console.error('Erro ao adicionar categoria:', error);
          toast.error('Erro ao adicionar categoria.');
        },
      });
      

    const updateCategoryMutation = useMutation({
        mutationFn: async (updatedCategory: Category) => {
            return categoryService.updateCategory(updatedCategory);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoria atualizada com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao atualizar categoria:', error);
            toast.error('Erro ao atualizar categoria.');
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: number) => {
            return categoryService.deleteCategory(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Categoria excluída com sucesso!');
        },
        onError: (error) => {
            console.error('Erro ao excluir categoria:', error);
            toast.error('Erro ao excluir categoria.');
        },
    });

    const addCategory = (newCategory: string) => {
        addCategoryMutation.mutate(newCategory);
    };

    const updateCategory = (updatedCategory: Category) => {
        updateCategoryMutation.mutate(updatedCategory);
    };

    const deleteCategory = (id: number) => {
        deleteCategoryMutation.mutate(id);
    };

    return {
        addCategory,
        updateCategory,
        deleteCategory,
    };
};
