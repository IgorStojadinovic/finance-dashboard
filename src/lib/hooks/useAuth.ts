import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi, AuthResponse } from '../../api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return false;
  }

  try {
    // Proveri da li je user validan JSON
    JSON.parse(user);
    return true;
  } catch {
    // Ako nije validan JSON, ukloni podatke
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};

export const useRegister = (): UseMutationResult<
  AuthResponse,
  Error,
  RegisterData
> => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      /* console.log('Attempting to register with data:', data); */
      const response = await authApi.register(data);
      /*console.log('Registration response:', response); */
      return response;
    },
    onSuccess: data => {
      /*  console.log('Registration successful:', data); */
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    },
    onError: error => {
      console.error('Registration failed:', error);
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginData
> => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      /*   console.log('Attempting to login with data:', data); */
      const response = await authApi.login(data);
      /*       console.log('Login response:', response); */
      return response;
    },
    onSuccess: data => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful', data.user.name);
      }
    },
    onError: error => {
      console.error('Login failed:', error);
      throw error;
    },
  });
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  return useMutation({
    mutationFn: async () => {
      const response = await authApi.logout();
      return response;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    onError: error => {
      console.error('Logout failed:', error);
    },
  });
};
