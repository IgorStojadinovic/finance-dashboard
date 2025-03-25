import {
  User,
  Transaction,
  Pot,
  Budget,
  RecurringBill,
  ApiResponse,
} from '../lib/types';

//const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Users API
export const usersApi = {
  getUser: async (id: number): Promise<ApiResponse<User>> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await res.json();
    return data;
  },

  updateUser: (id: string, data: Partial<User>): Promise<ApiResponse<User>> =>
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};

// Transactions API
export const transactionsApi = {
  getAll: (): Promise<ApiResponse<Transaction[]>> =>
    fetch(`${API_BASE_URL}/transactions`).then(res => res.json()),

  getById: (id: string): Promise<ApiResponse<Transaction>> =>
    fetch(`${API_BASE_URL}/transactions/${id}`).then(res => res.json()),

  create: (
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Transaction>> =>
    fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (
    id: string,
    data: Partial<Transaction>
  ): Promise<ApiResponse<Transaction>> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};

// Pots API
export const potsApi = {
  getAll: (): Promise<ApiResponse<Pot[]>> =>
    fetch(`${API_BASE_URL}/pots`).then(res => res.json()),

  getById: (id: string): Promise<ApiResponse<Pot>> =>
    fetch(`${API_BASE_URL}/pots/${id}`).then(res => res.json()),

  getUserPots: (userId: string): Promise<ApiResponse<Pot[]>> =>
    fetch(`${API_BASE_URL}/pots/user/${userId}`).then(res => res.json()),

  create: (
    data: Omit<Pot, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Pot>> =>
    fetch(`${API_BASE_URL}/pots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Pot>): Promise<ApiResponse<Pot>> =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetch(`${API_BASE_URL}/pots/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),

  updateTotal: (id: string, amount: number): Promise<ApiResponse<Pot>> =>
    fetch(`${API_BASE_URL}/pots/${id}/total`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then(res => res.json()),
};

// Budgets API
export const budgetsApi = {
  getAll: (): Promise<ApiResponse<Budget[]>> =>
    fetch(`${API_BASE_URL}/budgets`).then(res => res.json()),

  getById: (id: string): Promise<ApiResponse<Budget>> =>
    fetch(`${API_BASE_URL}/budgets/${id}`).then(res => res.json()),

  getUserBudgets: (userId: string): Promise<ApiResponse<Budget[]>> =>
    fetch(`${API_BASE_URL}/budgets/user/${userId}`).then(res => res.json()),

  getByCategory: (
    userId: string,
    category: string
  ): Promise<ApiResponse<Budget[]>> =>
    fetch(`${API_BASE_URL}/budgets/user/${userId}/category/${category}`).then(
      res => res.json()
    ),

  create: (
    data: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Budget>> =>
    fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (id: string, data: Partial<Budget>): Promise<ApiResponse<Budget>> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};

// Recurring Bills API
export const recurringBillsApi = {
  getAll: (): Promise<ApiResponse<RecurringBill[]>> =>
    fetch(`${API_BASE_URL}/recurring-bills`).then(res => res.json()),

  getById: (id: string): Promise<ApiResponse<RecurringBill>> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`).then(res => res.json()),

  getUserBills: (userId: string): Promise<ApiResponse<RecurringBill[]>> =>
    fetch(`${API_BASE_URL}/recurring-bills/user/${userId}`).then(res =>
      res.json()
    ),

  getByStatus: (
    userId: string,
    status: RecurringBill['status']
  ): Promise<ApiResponse<RecurringBill[]>> =>
    fetch(
      `${API_BASE_URL}/recurring-bills/user/${userId}/status/${status}`
    ).then(res => res.json()),

  getByMonth: (
    userId: string,
    year: number,
    month: number
  ): Promise<ApiResponse<RecurringBill[]>> =>
    fetch(
      `${API_BASE_URL}/recurring-bills/user/${userId}/month/${year}/${month}`
    ).then(res => res.json()),

  create: (
    data: Omit<RecurringBill, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<RecurringBill>> =>
    fetch(`${API_BASE_URL}/recurring-bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  update: (
    id: string,
    data: Partial<RecurringBill>
  ): Promise<ApiResponse<RecurringBill>> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetch(`${API_BASE_URL}/recurring-bills/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
};

export * from './users';
export * from './transactions';
export * from './pots';
export * from './budgets';
export * from './recurring-bills';
export * from './auth';
