import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { potsApi } from '../../api';
import { Pot } from '../types/types';

export const usePots = (userId: string) => {
  return useQuery<Pot[]>({
    queryKey: ['pots', userId],
    queryFn: () => potsApi.getUserPots(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
  });
};

export const useDeletePot = (pot: Pot) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => potsApi.delete(pot.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting pot:', error);
    },
  });
};

export const useUpdatePot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPot: Pot) => potsApi.update(updatedPot.id, updatedPot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
    },
    onError: (error: Error) => {
      console.error('Error updating pot:', error);
    },
  });
};
