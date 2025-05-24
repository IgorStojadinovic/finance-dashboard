import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../../api';
import { Transaction } from '../../lib/types/types';

export const useTransactions = (userId: string) => {
  const { data, isLoading, error } = useQuery<Transaction[], Error>({
    queryKey: ['transactions', userId],
    queryFn: () => transactionsApi.getTransactionsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, error };
};

export const useTransactionsByCategory = (category: string) => {
  const { data, isLoading, error } = useQuery<Transaction[], Error>({
    queryKey: ['transactions', category],
    queryFn: () => transactionsApi.sortByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, error };
};