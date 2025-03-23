import { create } from 'zustand';
import { BudgetEntry, userBudget } from '../lits';

type BudgetStore = {
  budgets: BudgetEntry[];
  handleAddBudget: (newBudget: BudgetEntry) => void;
  handleEditBudget: (updatedBudget: BudgetEntry) => void;
};

export const useBudgetStore = create<BudgetStore>(set => ({
  budgets: userBudget,
  handleAddBudget: newBudget =>
    set(state => ({ budgets: [newBudget, ...state.budgets] })),
  handleEditBudget: updatedBudget =>
    set(state => ({
      budgets: state.budgets.map(budget =>
        budget.id === updatedBudget.id ? updatedBudget : budget
      ),
    })),
}));
