import { writable } from 'svelte/store';
import type { ItemObject } from '../vite-env';

export const selected = writable<ItemObject | null>(null);
