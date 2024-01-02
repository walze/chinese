import { numberToMark } from 'pinyin-utils';
import { ItemObject } from './vite-env';
import { fixSimple, store } from './store';

type Props = {
  items: ItemObject[];
};

export const Related = (p: Props) => {
  const selected = store((s) => s.selected);
  const simplified = store((s) => s.simplified);
  const data = p.items;

  const d =
    data.filter((d) =>
      d.hanzi.includes(selected?.hanzi || ''),
    ) || ([] as ItemObject[]);

  return (
    <ul className="my-16">
      {d.map((item) => (
        <li className="mb-4" key={item.hanzi + item.pinyin}>
          <span className="text-indigo-600">
            {fixSimple(item.hanzi, simplified)}
          </span>

          <span className="text-neutral-400 ml-1 font-extralight">
            {numberToMark(item.pinyin)}
          </span>
          <p className="font-light">{item.def}</p>
        </li>
      ))}
    </ul>
  );
};
