import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { budgetsApi } from '../../api';
import { Budget, NewBudget } from '../types/types';

export const useBudgets = (userId: string): UseQueryResult<Budget[], Error> => {
  return useQuery<Budget[], Error>({
    queryKey: ['budgets', userId],
    queryFn: () => budgetsApi.getUserBudgets(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useUpdateBudget = (budget: Budget) => {
  const queryClient = useQueryClient();
  return useMutation<Budget, Error, Budget>({
    mutationFn: () => {
      if (!budget.id) {
        throw new Error('Budget ID is required');
      }
      return budgetsApi.update(budget.id, budget);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (error: Error) => {
      console.error('Error updating budget:', error);
    },
  });
};

export const useDeleteBudget = (budget: Budget) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, Budget>({
    mutationFn: () => {
      if (!budget.id) {
        throw new Error('Budget ID is required');
      }
      return budgetsApi.delete(budget.id);
    },
    onSuccess: () => {
      console.log('Budget deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting budget:', error);
    },
  });
};

export const useCreateBudget = (budget: NewBudget) => {
  const queryClient = useQueryClient();

  return useMutation<Budget, Error, NewBudget>({
    mutationFn: () => budgetsApi.create(budget),
    onSuccess: () => {
      console.log('Budget created successfully');
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      console.error('Error creating budget:', error);
    },
  });
};
