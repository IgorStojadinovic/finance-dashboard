import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi, AuthResponse } from '../../api';
import { ApiResponse } from '../types';

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
  ApiResponse<AuthResponse>,
  Error,
  RegisterData
> => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      console.log('Attempting to register with data:', data);
      const response = await authApi.register(data);
      console.log('Registration response:', response);
      return response;
    },
    onSuccess: data => {
      console.log('Registration successful:', data);
      if (data.success && data.data) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    },
    onError: error => {
      console.error('Registration failed:', error);
    },
  });
};

export const useLogin = (): UseMutationResult<
  ApiResponse<AuthResponse>,
  Error,
  LoginData
> => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      console.log('Attempting to login with data:', data);
      const response = await authApi.login(data);
      console.log('Login response:', response);
      return response;
    },
    onSuccess: data => {
      console.log('Login successful:', data);
      if (data.success && data.data) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    },
    onError: error => {
      console.error('Login failed:', error);
      throw error;
    },
  });
};

export const useLogout = (): UseMutationResult<
  ApiResponse<void>,
  Error,
  void
> => {
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

