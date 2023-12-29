import { createStore } from 'solid-js/store';
import type { ItemObject } from '../vite-env';

type Store = {
  selected: ItemObject | null;
  simplified: boolean;
};

export const store = createStore<Store>({
  selected: null,
  simplified: true,
});
