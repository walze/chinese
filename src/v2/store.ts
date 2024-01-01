import { create } from 'zustand';
import type { ItemObject } from '../vite-env';

type Store = {
  selected: ItemObject | null;
  simplified: boolean;
  suggestions: ItemObject[];
  related: ItemObject[];
  set: (store: Partial<Store>) => void;
};

export const store = create<Store>((st) => ({
  selected: null,
  simplified: false,
  suggestions: [],
  related: [],
  set: (store) => st((s) => ({ ...s, ...store })),
}));
