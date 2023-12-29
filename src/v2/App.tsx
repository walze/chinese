import {
  createSignal,
  onCleanup,
  onMount,
  createEffect,
  For,
  Accessor,
} from 'solid-js';
import {
  ItemObject,
  WorkerEvent,
  WorkerType,
} from '../vite-env';
import { numberToMark } from 'pinyin-utils';

import Hanzi from './HanZi.tsx';

import DictWorker from './worker?worker';
import List from './List.tsx';
import { fromEventPattern, map } from 'rxjs';
import use$ from './use$.ts';
import { store } from './store.ts';
import { Related } from './Related.tsx';

const useWorker = function <R, T>(
  type: WorkerType,
  data: Accessor<T>,
  init: R,
) {
  const worker = new DictWorker();

  const d = use$(
    fromEventPattern<MessageEvent<R>>(
      (handler) => worker.addEventListener('message', handler),
      (handler) =>
        worker.removeEventListener('message', handler),
    ).pipe(map((e) => e.data)),
    init,
  );

  createEffect(() => {
    const obj: WorkerEvent<T>['data'] = {
      type,
      data: data(),
    };

    worker.postMessage(obj);
  });

  return d;
};

const App = () => {
  const [s] = store;
  const [selected] = createSignal(s.selected);
  const [input, setInput] = createSignal('');

  const data = useWorker('input', input, [] as ItemObject[]);

  const related = useWorker(
    'input',
    selected,
    [] as ItemObject[],
  );

  // effect to clear input on select
  createEffect(() => {
    if (s.selected) {
      setInput('');
    }
  });

  createEffect(() => {
    console.log({
      data: data(),
      input: input(),
      store: s,
    });
  });

  return (
    <>
      <main class="mx-auto max-w-[320px] p-4 pt-6 text-slate-50">
        {s.selected && (
          <section class="mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700">
            <div>
              {s.selected?.hanzi && (
                <Hanzi chars={s.selected?.hanzi} />
              )}
              汉字
              <span class="text-neutral-600 absolute ml-3 font-thin">
                Hàn Zi
              </span>
            </div>

            <div>
              <span class="text-xl mb-4">
                {numberToMark(s.selected?.pinyin as string)}
              </span>
              <br />
              拼音
              <span class="text-neutral-600 absolute ml-3 font-thin">
                Pīn Yin
              </span>
            </div>

            <div>
              <span class="text-xl mb-4">
                {s.selected?.def.replaceAll('/', ' — ')}
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
            value={input()}
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
              checked={s.simplified}
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

          {data()?.length && <List items={data()} />}
        </div>

        <Related items={related()} />

        <section class="font-thin mt-16 text-neutral-600 hover:text-neutral-400">
          <h3 class="tracking-wide leading-8">Instructions</h3>

          <p class="text-sm">
            In the input box, you can type Pīn Yin, Hàn Zi, or
            English. It will give you a list of options that
            matches best your input. When using Pīn Yin, you can
            use the tone marks (ā, á, ǎ, à, a) or the numbers (1,
            2, 3, 4, 5). E.g. "zhong3" or "zhǒng". Once selected,
            a list of related words will appear below the input
            box.
          </p>
        </section>
      </main>
    </>
  );
};

export default App;
