import {
  createSignal,
  onCleanup,
  onMount,
  createEffect,
} from 'solid-js';
import { ItemObject } from '../vite-env';
import { numberToMark } from 'pinyin-utils';

import Hanzi from './HanZi.tsx';

import DictWorker from '../worker?worker';
import List from './List.tsx';
import { fromEventPattern, map } from 'rxjs';
import use$ from './use$.ts';

const worker = new DictWorker();

const App = () => {
  const data = use$(
    fromEventPattern<MessageEvent<ItemObject[]>>(
      (handler) => worker.addEventListener('message', handler),
      (handler) =>
        worker.removeEventListener('message', handler),
    ).pipe(map((e) => e.data)),
    [] as ItemObject[],
  );

  const [selected, setSelected] =
    createSignal<ItemObject | null>(null);

  const [input, setInput] = createSignal('');
  let simplified = true;

  const pinyin = selected()?.pinyin as string;

  const hanzi = selected()
    ? selected()?.hanzi.split(' ')[simplified ? 1 : 0]
    : '';

  createEffect(() => {
    console.log({
      hanzi,
      data: data(),
      pinyin,
      def: selected()?.def,
    });
  });

  createEffect(() => {
    worker.postMessage(input());
  });

  return (
    <>
      <main class="mx-auto max-w-[320px] p-4 pt-6 text-slate-50">
        {selected() && (
          <section class="mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700">
            <div>
              {hanzi && <Hanzi chars={hanzi} />}
              汉字
              <span class="text-neutral-600 absolute ml-3 font-thin">
                Hàn Zi
              </span>
            </div>

            <div>
              <span class="text-xl mb-4">
                {numberToMark(selected()?.pinyin as string)}
              </span>
              <br />
              拼音
              <span class="text-neutral-600 absolute ml-3 font-thin">
                Pīn Yin
              </span>
            </div>

            <div>
              <span class="text-xl mb-4">
                {selected()?.def.replaceAll('/', ' — ')}
              </span>
              <br />
              定義
              <span class="text-neutral-600 absolute ml-3 font-thin">
                Definition
              </span>
            </div>
          </section>
        )}

        <label
          for="combobox"
          class="block text-2xl font-bold text-center mb-2"
        >
          Type your 拼音
          <span class="text-neutral-600 absolute ml-3 font-thin">
            Pīn Yin
          </span>
        </label>

        <div class="relative mt-1">
          <input
            onInput={(e) => setInput(e.currentTarget.value)}
            id="combobox"
            type="text"
            autofocus
            class="w-full rounded-md border border-gray-300 bg-neutral-900 py-2 pl-3 pr-12 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
            role="combobox"
            aria-controls="options"
            aria-expanded={!!data()?.length}
          />

          <fieldset class="absolute">
            <input
              checked={simplified}
              type="checkbox"
              name="simplified"
              id="simplified"
              class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              for="simplified"
              class="mt-1 text-neutral-600 text-sm absolute ml-2 font-thin"
            >
              Simplified?
            </label>
          </fieldset>
        </div>

        <List simplified={simplified} items={data() || []} />
      </main>
    </>
  );
};

export default App;
