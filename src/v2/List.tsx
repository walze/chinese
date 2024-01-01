import { numberToMark } from 'pinyin-utils';
import { store } from './store';
import { ItemObject } from '../vite-env';

interface ListProps {
  items: ItemObject[];
}

const List = (p: ListProps) => {
  const s = store.getState();

  const handleClick = (
    _hanzi: string,
    pinyin: string,
    def: string,
  ) => {
    const hanzi = _hanzi.split(' ')[s.simplified ? 1 : 0];
    s.setStore({ selected: { hanzi, pinyin, def } });
  };

  return (
    <ul
      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      id="options"
      role="listbox"
    >
      {p.items?.map(({ hanzi, pinyin, def }, i) => (
        <li
          className="relative py-2 pl-3 pr-9 text-gray-900 hover:bg-slate-200 cursor-pointer"
          id={`option-${i}`}
          key={hanzi}
          role="option"
          tabIndex={i}
          onClick={() => handleClick(hanzi, pinyin, def)}
        >
          <span className="block truncate">
            {hanzi.split(' ')[s.simplified ? 1 : 0]} -{' '}
            {numberToMark(pinyin)} - {def}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default List;
