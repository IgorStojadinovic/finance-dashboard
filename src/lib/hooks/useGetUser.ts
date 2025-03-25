import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../api';

export const useGetUser = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { user: data, isLoading, error };
};
