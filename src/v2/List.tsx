import { createSignal, onCleanup } from 'solid-js';
import { numberToMark } from 'pinyin-utils';

export interface ItemObject {
  hanzi: string;
  pinyin: string;
  def: string;
}

interface ListProps {
  items: ItemObject[];
  simplified?: boolean;
}

const List = (props: ListProps) => {
  console.log(props.items);

  const [selected, sets] = createSignal<ItemObject | null>(null);
  const [marks, setMarks] = createSignal<ItemObject[]>(
    props.items,
  );

  const handleClick = (
    hanzi: string,
    pinyin: string,
    def: string,
  ) => {
    sets({ hanzi, pinyin, def });
    setMarks([]);
  };

  const handleKeyPress = (
    e: KeyboardEvent,
    hanzi: string,
    pinyin: string,
    def: string,
  ) => {
    if (e.key === 'Enter') {
      sets({ hanzi, pinyin, def });
    }
  };

  onCleanup(() => {});

  return (
    <>
      {marks().length > 0 && (
        <ul
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          id="options"
          role="listbox"
        >
          {marks().map(({ hanzi, pinyin, def }) => (
            <li
              class="relative py-2 pl-3 pr-9 text-gray-900 hover:bg-slate-200 cursor-pointer"
              id="option-0"
              role="option"
              aria-selected="false"
              tabindex="-1"
              onClick={() => handleClick(hanzi, pinyin, def)}
              onKeyPress={(e) =>
                handleKeyPress(e, hanzi, pinyin, def)
              }
            >
              <span class="block truncate">
                {hanzi.split(' ')[props.simplified ? 1 : 0]} -{' '}
                {numberToMark(pinyin)} - {def}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
