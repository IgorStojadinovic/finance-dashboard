// Tip za model User
export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  transactions: Transaction[];
  pots: Pot[];
  budgets: Budget[];
  recurringBills: RecurringBill[];
  balance: Balance[];
  createdAt: Date;
  updatedAt: Date;
};

export type Balance = {
  id: string;
  userId: string;
  balance: number;
  income: number;
  expenses: number;
};

// Tip za model Transaction
export type Transaction = {
  id: string;
  userId: string;
  user: User;
  name: string;
  amount: number;
  date: Date;
  category: string;
  recurring: boolean;
  status: string;
  image: string;
};

// Tip za model RecurringBill
export type RecurringBill = {
  id: string;
  userId: string;
  user: User;
  name: string;
  amount: number;
  orderDate: Date;
  status: string;
  date: Date;
  category: string;
  color: string;
};

export type NewBudget = {
  userId: string;
  category: string;
  spending_limit: number;
  spent: number;
  theme: string;
  hex: string;
};

// Tip za model Budget
export type Budget = {
  id?: string;
  userId?: string;
  user?: User;
  category: string;
  spent: number;
  spending_limit: number;
  theme: string;
  hex: string;
  progressBar?: string;
  latest_spending: {
    name: string;
    amount: number;
    date: string;
    image: string;
  }[];
};

// Tip za model Pot
export type Pot = {
  id: string;
  userId: string;
  user?: User;
  name: string;
  target: number;
  total: number;
  hex: string;
  theme: string;
  progressBar?: string;
};

export type Colors = {
  name: string;
  hex: string;
};

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type ColorTag = {
  theme: string;
  hex: string;
};

export type CreatePot = {
  userId: string;
  name: string;
  target: number;
  total: number;
  hex: string;
  theme: string;
  progressBar?: string;
};
