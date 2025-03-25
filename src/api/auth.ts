import { ApiResponse, User } from '../lib/types';

export interface AuthResponse {
  user: User;
  token: string;
}

//const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;


export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Registration failed');
    }

    return json;
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Invalid credentials');
    }

    return json;
  },
};
