import { create } from 'zustand';
import type { ItemObject } from '../vite-env';

type Store = {
  selected: ItemObject | null;
  simplified: boolean;
  suggestions: ItemObject[];
  related: ItemObject[];
  set: (store: Partial<Store>) => void;
  select: (item: ItemObject) => void;
};

export const fixSimple = (s: string, b: boolean) =>
  s.split(' ')[b ? 1 : 0];

export const store = create<Store>((st, s) => ({
  selected: null,
  select: (item) => {
    const hanzi = fixSimple(item.hanzi, s().simplified);

    st({
      selected: { ...item, hanzi },
    });
  },
  simplified: true,
  suggestions: [],
  related: [],
  set: (store) => st((s) => ({ ...s, ...store })),
}));
