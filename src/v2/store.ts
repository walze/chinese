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

export const store = create<Store>((st, s) => ({
  selected: null,
  select: (item) => {
    const hanzi = item?.hanzi[s().simplified ? 0 : 1];

    st({
      selected: { ...item, hanzi },
    });
  },
  simplified: true,
  suggestions: [],
  related: [],
  set: (store) => st((s) => ({ ...s, ...store })),
}));
