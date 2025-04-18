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

// Tip za model Budget
export type Budget = {
  id: string;
  userId: string;
  user: User;
  category: string;
  maximum: number;
  theme: string;
  limmit: number;
  hex: string;
};

// Tip za model Pot
export type Pot = {
  id: string;
  userId: string;
  user: User;
  name: string;
  target: number;
  total: number;
  hex: string;
  theme: string;
};

export type Colors = {
  name: string;
  hex: string;
};
