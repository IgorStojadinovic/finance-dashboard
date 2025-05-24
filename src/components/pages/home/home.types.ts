import {
  Budget,
  RecurringBill,
  Pot,
  Transaction,
  Balance,
} from '../../../lib/types/types';

export type BudgetsProps = {
  budgetsData: Budget[];
  isLoading: boolean;
};

export type BillsProps = {
  billsData: RecurringBill[];
};

export type TransactionsProps = {
  transactionsData: Transaction[];
};

export type TransactionItemProps = {
  name: string;
  amount: number;
  image: string;
  date: Date;
};

export type RecurringBillSummary = Pick<
  RecurringBill,
  'color' | 'category' | 'amount'
>;

export type OverviewProps = {
  currentBalance: Balance[];
};

export type PotsProps = {
  potsData: Pot[];
  transactionsData: Transaction[];
  isLoading: boolean;
};

export type HeaderProps = {
  title: string;
  link: string;
  linkText: string;
};

export type BudgetItemProps = {
  category: string;
  maximum: number;
  hex: string;
};
