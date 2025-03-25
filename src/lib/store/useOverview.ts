import { create } from 'zustand';
import { User } from '../types';

interface OverviewStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useOverviewStore = create<OverviewStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
