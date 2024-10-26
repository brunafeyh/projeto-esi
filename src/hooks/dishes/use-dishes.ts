import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DishService from '../../services/dishes';
import { DishValueForm } from '../../types/dishes';
import { Dish } from '../../types/dish';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/resposse-api';

const dishService = new DishService();

export const useDishes = () => {
  const queryClient = useQueryClient();

  const { data: dishes = [], error, isLoading } = useQuery<Dish[], Error>({
    queryKey: ['dishes'],
    queryFn: () => dishService.fetchDishList(),
  });

  const addDishMutation = useMutation({
    mutationFn: async (newDish: DishValueForm) => {
        await dishService.addDish(newDish);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success('Prato adicionado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message;
      toast.error(`Erro ao adicionar prato : ${message}`);
      throw error;
    }
  });

  const addIsLoading = addDishMutation.isPending

  const updateDishMutation = useMutation({
    mutationFn: async (updatedDish: DishValueForm) => {
       await dishService.updateDish(updatedDish.id, updatedDish)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success('Prato atualizado com sucesso!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message;
      toast.error(`Erro ao atualizar prato: ${message}`);
      throw error;
    },
  });

  const updateIsLoading = updateDishMutation.isPending

  const deleteDishMutation = useMutation({
    mutationFn: async (id: string) => {
        await dishService.deleteDish(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
      toast.success('Prato removido com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao remover prato : ${error}`);
      throw error;
    }
  });

  const deleteIsLoading = deleteDishMutation.isPending

  const totalDishes = dishes.length;

  return {
    dishes,
    totalDishes,
    isLoading,
    error,
    addDish: addDishMutation.mutate,
    updateDish: updateDishMutation.mutate,
    deleteDish: deleteDishMutation.mutate,
    addIsLoading,
    updateIsLoading,
    deleteIsLoading
  };
};
