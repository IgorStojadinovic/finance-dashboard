import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recurringBillsApi } from '../../api';
import { RecurringBill } from '../../lib/types';
import { ApiResponse } from '../../lib/types';

export const useRecurringBills = () => {
  return useQuery<ApiResponse<RecurringBill[]>, Error>({
    queryKey: ['recurringBills'],
    queryFn: recurringBillsApi.getAll,
  });
};

export const useRecurringBill = (id: string) => {
  return useQuery<ApiResponse<RecurringBill>, Error>({
    queryKey: ['recurringBill', id],
    queryFn: () => recurringBillsApi.getById(id),
    enabled: !!id,
  });
};

export const useUserRecurringBills = (userId: string) => {
  return useQuery<ApiResponse<RecurringBill[]>, Error>({
    queryKey: ['userRecurringBills', userId],
    queryFn: () => recurringBillsApi.getUserBills(userId),
    enabled: !!userId,
  });
};

export const useRecurringBillsByStatus = (
  userId: string,
  status: RecurringBill['status']
) => {
  return useQuery<ApiResponse<RecurringBill[]>, Error>({
    queryKey: ['recurringBillsByStatus', userId, status],
    queryFn: () => recurringBillsApi.getByStatus(userId, status),
    enabled: !!userId && !!status,
  });
};

export const useRecurringBillsByMonth = (
  userId: string,
  year: number,
  month: number
) => {
  return useQuery<ApiResponse<RecurringBill[]>, Error>({
    queryKey: ['recurringBillsByMonth', userId, year, month],
    queryFn: () => recurringBillsApi.getByMonth(userId, year, month),
    enabled: !!userId && !!year && !!month,
  });
};

export const useCreateRecurringBill = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<RecurringBill>,
    Error,
    Omit<RecurringBill, 'id' | 'createdAt' | 'updatedAt'>
  >({
    mutationFn: recurringBillsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurringBills'] });
    },
  });
};

export const useUpdateRecurringBill = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<RecurringBill>,
    Error,
    { id: string; data: Partial<RecurringBill> }
  >({
    mutationFn: ({ id, data }) => recurringBillsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['recurringBills'] });
      queryClient.invalidateQueries({ queryKey: ['recurringBill', id] });
    },
  });
};

export const useDeleteRecurringBill = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, string>({
    mutationFn: recurringBillsApi.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['recurringBills'] });
      queryClient.invalidateQueries({ queryKey: ['recurringBill', id] });
    },
  });
};
