import { numberToMark } from 'pinyin-utils';
import { ItemObject } from '../vite-env';
import { store } from './store';

type Props = {
  items: ItemObject[];
};

export const isHanzi = (s: string) => {
  return s.length === 1 && s.charCodeAt(0) > 19968;
};

export const Related = (p: Props) => {
  const s = store.getState();
  const data = p.items;

  console.log(data.slice(0, 5));

  if (!s.selected) {
    return <>No results</>;
  }

  const d =
    data
      ?.slice(0, 5)
      .filter((d) =>
        d.pinyin.includes(s.selected?.pinyin || ''),
      ) || ([] as ItemObject[]);

  return (
    <ul className="my-16">
      {d.map((item) => (
        <li className="mb-4">
          <span className="text-indigo-600">{item.hanzi}</span>

          <span className="text-neutral-400 ml-1 font-extralight">
            {numberToMark(item.pinyin)}
          </span>
          <p className="font-light">{item.def}</p>
        </li>
      ))}
    </ul>
  );
};
