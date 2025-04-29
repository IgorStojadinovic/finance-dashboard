import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { budgetsApi } from '../../api';
import { Budget } from '../types/types';

export const useBudgets = (userId: string): UseQueryResult<Budget[], Error> => {
  return useQuery<Budget[], Error>({
    queryKey: ['budgets', userId],
    queryFn: () => budgetsApi.getUserBudgets(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};