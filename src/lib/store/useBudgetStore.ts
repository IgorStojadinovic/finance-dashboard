import { create } from 'zustand';
import { Budget } from '../types/types';
import { colorTags } from '../../ui/ModalColorTagsDropdown/data/index';

interface BudgetStore {
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
  addBudgetModalOpen: boolean;
  setAddBudgetModalOpen: (open: boolean) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  categories: string[];
  spendingLimit: number;
  setSpendingLimit: (id: string, value: number) => void;
  spentValue: number;
  setSpentValue: (id: string, value: number) => void;
  currentColorTag: string;
  setCurrentColorTag: (id: string, theme: string, hex: string) => void;
  storeBudgets: Budget[];
  setStoreBudgets: (updateFn: (budgets: Budget[]) => Budget[]) => void;
  handleEditBudget: () => void;
  budget: Budget | null;
  setBudget: (budget: Budget) => void;
  stateProgressBar: string;
  setStateProgressBar: (progressBar: string) => void;
}

export const useBudgetStore = create<BudgetStore>(set => ({
  editModalOpen: false,
  setEditModalOpen: (open: boolean) => set({ editModalOpen: open }),
  addBudgetModalOpen: false,
  setAddBudgetModalOpen: (open: boolean) => set({ addBudgetModalOpen: open }),
  storeBudgets: [],
  budget: null,
  setBudget: (budget: Budget) => set({ budget, currentColorTag: budget.theme }),
  currentCategory: 'All Transactions',
  setCurrentCategory: (category: string) => set({ currentCategory: category }),
  categories: [],
  stateProgressBar: "0%",
  setStateProgressBar: (progressBar: string) => set({ stateProgressBar: progressBar }),
  spendingLimit: 0,
  setSpendingLimit: (id: string, value: number) =>
    set(state => ({
      storeBudgets: state.storeBudgets.map(budget =>
        budget.id === id ? { ...budget, spending_limit: value } : budget
      ),
    })),
  spentValue: 0,
  setSpentValue: (id: string, value: number) =>
    set(state => ({
      storeBudgets: state.storeBudgets.map(budget =>
        budget.id === id ? { ...budget, spent: value } : budget
      ),
    })),
  currentColorTag: colorTags[0].theme,
  setCurrentColorTag: (id: string, theme: string, hex: string) =>
    set(state => ({
      storeBudgets: state.storeBudgets.map(budget =>
        budget.id === id ? { ...budget, theme: theme, hex: hex } : budget
      ),
      currentColorTag: theme,
    })),
  handleEditBudget: () => {},
  setStoreBudgets: (updateFn: (budgets: Budget[]) => Budget[]) =>
    set(state => ({
      storeBudgets: updateFn(state.storeBudgets),
    })),
}));
