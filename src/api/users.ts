import { User } from '../lib/types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_DEV_URL = import.meta.env.VITE_API_DEV_URL;

export const usersApi = {
  getAll: (): Promise<User[]> =>
    fetch(`${API_BASE_URL}/users`).then(res => res.json()),

  getById: (id: string): Promise<User> =>
    fetch(`${API_BASE_URL}/users/${id}`).then(res => res.json()),

  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<User>) =>
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string) =>
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};
