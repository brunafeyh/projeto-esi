import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CategoryService, { Category } from '../../services/category';
import axios from 'axios';

const categoryService = new CategoryService();

export const useCategories = () => {
    const { data: categories = [], isLoading, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
               return await categoryService.fetchCategories();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(`Erro ao carregar categorias: ${error.response?.status} ${error.response?.data?.message || error.message}`);
                } else {
                    toast.error('Erro ao carregar categorias: ' + error);
                }
                throw error;
            }
        },
    });

    return {
        categories,
        isLoading,
        error,
    };
};
