import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DishService from '../../services/dishes';
import { Dishe } from '../../types/dishes';
import { Dish } from '../../types/dish';

const dishService = new DishService();

export const useDishes = () => {
  const queryClient = useQueryClient();

  const { data: dishes = [], error, isLoading } = useQuery<Dish[], Error>({
    queryKey: ['dishes'],
    queryFn: () => dishService.fetchDishList(),
  });

  const addDishMutation = useMutation({
    mutationFn: async (newDish: Dishe) => {
      try {
        await dishService.addDish(newDish);
        toast.success('Prato adicionado com sucesso!');
      } catch (error) {
        toast.error('Erro ao adicionar prato.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const updateDishMutation = useMutation({
    mutationFn: async (updatedDish: Dishe) => {
      try {
        await dishService.updateDish(updatedDish.id, updatedDish);
        toast.success('Prato atualizado com sucesso!');
      } catch (error) {
        toast.error('Erro ao atualizar prato.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const deleteDishMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await dishService.deleteDish(id);
        toast.success('Prato removido com sucesso!');
      } catch (error) {
        toast.error('Erro ao remover prato.');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const totalDishes = dishes.length;

  return {
    dishes,
    totalDishes,
    isLoading,
    error,
    addDish: addDishMutation.mutate,
    updateDish: updateDishMutation.mutate,
    deleteDish: deleteDishMutation.mutate,
  };
};
