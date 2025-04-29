import { create } from 'zustand';
import { Budget } from '../types/types';

type BudgetStore = {
  budgets: Budget[];
  handleAddBudget: (newBudget: Budget) => void;
  handleEditBudget: (updatedBudget: Budget) => void;
};

export const useBudgetStore = create<BudgetStore>(set => ({
  budgets: [],
  handleAddBudget: newBudget =>
    set(state => ({ budgets: [newBudget, ...state.budgets] })),
  handleEditBudget: updatedBudget =>
    set(state => ({
      budgets: state.budgets.map(budget =>
        budget.id === updatedBudget.id ? updatedBudget : budget
      ),
    })),
}));
