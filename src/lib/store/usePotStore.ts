import { create } from 'zustand';
import { userPots } from '../lits';
import { Pot, User } from '../types/types';

const initialPots: Pot[] = userPots.map(pot => ({
  id: pot.id || '',
  userId: '',
  user: {} as User,
  name: pot.name,
  target: parseFloat(pot.target),
  total: parseFloat(pot.saved || '0'),
  hex: pot.hex || '',
  theme: pot.colorName,
  progressBar: pot.bar || '0%',
}));

type PotStore = {
  pots: Pot[];
  isLoading: boolean;
  handleAddPot: (newPot: Pot) => void;
  handleEditPot: (updatedPot: Pot) => void;
  handleDeletePot: (potId: string | Pot) => void;
  setStorePots: (pots: Pot[]) => void;
};

export const usePotStore = create<PotStore>(set => ({
  pots: initialPots,
  isLoading: false,
  handleAddPot: newPot => set(state => ({ pots: [newPot, ...state.pots] })),
  handleEditPot: updatedPot =>
    set(state => ({
      pots: state.pots.map(pot =>
        pot.id === updatedPot.id ? updatedPot : pot
      ),
    })),
  handleDeletePot: potId =>
    set(state => ({
      pots: state.pots.filter(
        pot => pot.id !== (typeof potId === 'string' ? potId : potId.id)
      ),
    })),
  setStorePots: pots => set({ pots }),
}));
