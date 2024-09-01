import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import DishService from '../services/dishes'
import { Prato } from '../types/dishes'

const dishService = new DishService()

export const useDishes = () => {
  const queryClient = useQueryClient();

  const { data: dishes = [], error, isLoading } = useQuery<Prato[], Error>({
    queryKey: ['dishes'],
    queryFn: () => dishService.fetchDishes(),
  });

  const addDishMutation = useMutation({
    mutationFn: (newDish: Prato) => dishService.addDish(newDish),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const updateDishMutation = useMutation({
    mutationFn: (updatedDish: Prato) => dishService.updateDish(updatedDish),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const deleteDishMutation = useMutation({
    mutationFn: (id: string) => dishService.deleteDish(id),
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
