import { create } from 'zustand';
import { Pot } from '../types/types';

type ModalType = 'add' | 'withdraw';

interface PotTransactionModalState {
  open: boolean;
  modalType: ModalType | null;
  currentPot: Pot | null;
  openModal: (pot: Pot, modalType: ModalType) => void;
  closeModal: () => void;
}

export const usePotTransactionModalStore = create<PotTransactionModalState>(
  set => ({
    open: false,
    modalType: null,
    currentPot: null,
    openModal: (pot, modalType) => set({ open: true, currentPot: pot, modalType }),
    closeModal: () => set({ open: false, currentPot: null, modalType: null }),
  })
);
