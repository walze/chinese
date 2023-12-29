import { For, splitProps } from 'solid-js';
import { numberToMark } from 'pinyin-utils';
import { ItemObject } from '../vite-env';
import { store } from './store';

type Props = {
  items: ItemObject[];
};

const isHanzi = (s: string) => {
  return s.length === 1 && s.charCodeAt(0) > 19968;
};

export const Related = (p: Props) => {
  const [s] = store;
  const [{ items: data }] = splitProps(p, ['items']);

  console.log(data.slice(0, 5));

  if (!s.selected) {
    return <>No results</>;
  }

  return (
    <ul class="my-16">
      <For
        each={
          data
            ?.slice(0, 5)
            .filter((d) =>
              d.pinyin.includes(s.selected?.pinyin || ''),
            ) || []
        }
      >
        {(item) => (
          <li class="mb-4">
            <span class="text-indigo-600">{item.hanzi}</span>

            <span class="text-neutral-400 ml-1 font-extralight">
              {numberToMark(item.pinyin)}
            </span>
            <p class="font-light">{item.def}</p>
          </li>
        )}
      </For>
    </ul>
  );
};
