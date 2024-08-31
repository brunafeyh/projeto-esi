import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Prato } from '../types/dishes';
import { addPrato, deletePrato, fetchPratos, updatePrato } from '../services/dishes';

export const useDishes = () => {
  const queryClient = useQueryClient();

  const { data: dishes = [], error, isLoading } = useQuery<Prato[], Error>({
    queryKey: ['dishes'],
    queryFn: fetchPratos,
  });

  const addPratoMutation = useMutation({
    mutationFn: addPrato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const updatePratoMutation = useMutation({
    mutationFn: updatePrato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });

  const deletePratoMutation = useMutation({
    mutationFn: deletePrato,
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
    addPrato: addPratoMutation.mutate,
    updatePrato: updatePratoMutation.mutate,
    deletePrato: deletePratoMutation.mutate,
  };
};
