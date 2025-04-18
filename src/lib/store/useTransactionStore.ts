import { create } from 'zustand';
import { Transaction } from '../types/types';

interface TransactionStore {
  stateTransactions: Transaction[];
  setStateTransactions: (transactions: Transaction[]) => void;
  currentSort: string;
  setCurrentSort: (sort: string) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
  disabledSearch: boolean;
  setDisabledSearch: (disabled: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  
}

export const useTransactionStore = create<TransactionStore>(set => ({
  stateTransactions: [],
  setStateTransactions: transactions =>
    set({ stateTransactions: transactions }),
  currentSort: 'latest',
  setCurrentSort: sort => set({ currentSort: sort }),
  currentCategory: 'all transactions',
  setCurrentCategory: category => set({ currentCategory: category }),
  searchInput: '',
  setSearchInput: input => set({ searchInput: input }),
  disabledSearch: false,
  setDisabledSearch: disabled => set({ disabledSearch: disabled }),
  currentPage: 1,
  setCurrentPage: page => set({ currentPage: page }),
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => {
    set({ searchInput: e.target.value });
  },
  pageSize: 9,
  setPageSize: pageSize => set({ pageSize }),
}));
