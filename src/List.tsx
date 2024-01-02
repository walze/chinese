import { numberToMark } from 'pinyin-utils';
import { store } from './store';
import { ItemObject } from './vite-env';

interface ListProps {
  list: ItemObject[];
}

const hash = (s: string) => {
  let h = 0;

  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }

  return h;
};

const List = (p: ListProps) => {
  const simplified = store((s) => s.simplified);
  const select = store((s) => s.select);
  const suggestions = p.list;

  const handleClick = (
    hanzi: string,
    pinyin: string,
    def: string,
  ) => {
    select({
      hanzi,
      pinyin,
      def,
    });
  };

  return (
    <ul
      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      id="options"
      role="listbox"
    >
      {suggestions?.map(({ hanzi, pinyin, def }, i) => (
        <li
          className="relative py-2 pl-3 pr-9 text-gray-900 hover:bg-slate-200 cursor-pointer"
          id={`option-${i}`}
          key={hash(hanzi + pinyin + def)}
          role="option"
          tabIndex={i}
          onClick={() => handleClick(hanzi, pinyin, def)}
        >
          <span className="block truncate">
            {hanzi.split(' ')[simplified ? 1 : 0]} -{' '}
            {numberToMark(pinyin)} - {def}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default List;
