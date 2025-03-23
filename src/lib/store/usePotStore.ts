import { create } from 'zustand';
import { userPots } from '../lits';  
import { PotsArr } from '../lits';

type PotStore = {
  pots: PotsArr[];
  handleUpdateMoneyBar: (
    potName: string,
    amount: number,
    isAdding: boolean
  ) => void;
  handleAddPot: (newPot: PotsArr) => void;
  handleEditPot: (updatedPot: PotsArr) => void;
  handleDeletePot: (potId: string | PotsArr) => void;
};

export const usePotStore = create<PotStore>(set => ({
  pots: userPots,
  handleUpdateMoneyBar: (potName, amount, isAdding) =>
    set(state => ({
      pots: state.pots
        .map(pot =>
          pot.name === potName
            ? {
                ...pot,
                saved: isAdding
                  ? (
                      Math.round(
                        (parseFloat(pot.saved || '0') + amount) * 100
                      ) / 100
                    ).toString()
                  : (
                      Math.round(
                        (parseFloat(pot.saved || '0') - amount) * 100
                      ) / 100
                    ).toString(),
              }
            : pot
        )
        .map(pot => ({
          ...pot,
          saved: parseFloat(pot.saved || '0') < 0 ? '0' : pot.saved,
        })),
    })),
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
}));
