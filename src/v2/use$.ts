import { Observable, Subscription } from 'rxjs';
import { createSignal, onCleanup, onMount } from 'solid-js';

export default function <T, I>(o: Observable<T>, init: I) {
  const [value, setV] = createSignal<T | I>(init);
  const [sub, setSub] = createSignal<Subscription | null>(null);

  onMount(() => {
    setSub(o.subscribe(setV));
  });

  onCleanup(() => {
    sub()?.unsubscribe();
  });

  return value;
}
