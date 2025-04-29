import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../api';
import { User } from '../types/types';

export const useGetUser = (id: string) => {
  const { data, isLoading, error } = useQuery<User>({
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

export const useUserId = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.id;
  }
  return null;
};
