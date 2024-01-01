import { numberToMark } from 'pinyin-utils';

import Hanzi from './HanZi.tsx';

import DictWorker from './worker?worker';
import List from './List.tsx';
import { fromEventPattern, map } from 'rxjs';
import use$ from './use$.ts';
import { Related } from './Related.tsx';
import { ItemObject, WorkerEvent } from '../vite-env';
import { useEffect, useRef, useState } from 'react';
import { store } from './store.ts';

export const useObjectDiff = (obj: any) => {
  const prevObjRef = useRef<any>(obj);

  useEffect(() => {
    const prevObj = prevObjRef.current;
    const keys = Object.keys(obj);

    for (const key of keys) {
      if (obj[key] !== prevObj[key]) {
        console.log(
          `Property '${key}' changed:`,
          prevObj[key],
          '->',
          obj[key],
        );
      }
    }

    prevObjRef.current = obj;
  }, [obj]);
};

const worker = new DictWorker();
const message$ = fromEventPattern<WorkerEvent<ItemObject[]>>(
  (handler) => worker.addEventListener('message', handler),
  (handler) => worker.removeEventListener('message', handler),
).pipe(map((e) => e.data));

const App = () => {
  const message = use$(message$, { type: 'init', data: [] });
  const [input, setInput] = useState('');

  const selected = store((s) => s.selected);
  const suggestions = store((s) => s.suggestions);
  const related = store((s) => s.related);
  const simplified = store((s) => s.simplified);

  useObjectDiff(store());

  useEffect(() => {
    switch (message.type) {
      case 'init':
        break;
      case 'query':
        store.setState({
          related: message.data,
        });
        break;
      case 'input':
        store.setState({
          suggestions: message.data,
        });
        break;
    }
  }, [message]);

  useEffect(() => {
    if (!input) return;

    worker.postMessage({
      type: 'input',
      data: input,
    });
  }, [input]);

  useEffect(() => {
    if (!selected) return;

    store.setState({ suggestions: [] });
    setInput('');
    worker.postMessage({
      type: 'query',
      data: selected.pinyin,
    });
  }, [selected?.hanzi]);

  return (
    <>
      <main className="mx-auto max-w-[320px] p-4 pt-6 text-slate-50">
        {selected && (
          <section className="mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700">
            <div>
              {selected?.hanzi && (
                <Hanzi chars={selected?.hanzi} />
              )}
              汉字
              <span className="text-neutral-600 absolute ml-3 font-thin">
                Hàn Zi
              </span>
            </div>

            <div>
              <span className="text-xl mb-4">
                {numberToMark(selected?.pinyin as string)}
              </span>
              <br />
              拼音
              <span className="text-neutral-600 absolute ml-3 font-thin">
                Pīn Yin
              </span>
            </div>

            <div>
              <span className="text-xl mb-4">
                {selected?.def.replaceAll('/', ' — ')}
              </span>
              <br />
              定義
              <span className="text-neutral-600 absolute ml-3 font-thin">
                Definition
              </span>
            </div>
          </section>
        )}

        <label
          htmlFor="combobox"
          className="block text-2xl font-bold text-center mb-2"
        >
          Type your 拼音
          <span className="text-neutral-600 absolute ml-3 font-thin">
            Pīn Yin
          </span>
        </label>

        <div className="relative mt-1">
          <input
            onInput={(e) => setInput(e.currentTarget.value)}
            value={input}
            id="combobox"
            type="text"
            autoFocus={true}
            className="w-full rounded-md border border-gray-300 bg-neutral-900 py-2 pl-3 pr-12 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
            role="combobox"
            aria-controls="options"
            aria-expanded={!!suggestions?.length}
          />

          <fieldset className="absolute">
            <input
              checked={simplified}
              onChange={(e) => {
                store.setState({
                  simplified: e.currentTarget.checked,
                });
              }}
              type="checkbox"
              name="simplified"
              id="simplified"
              className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="simplified"
              className="mt-1 text-neutral-600 text-sm absolute ml-2 font-thin"
            >
              Simplified?
            </label>
          </fieldset>

          {suggestions?.length && <List list={suggestions} />}
        </div>

        <Related items={related} />

        <section className="font-thin mt-16 text-neutral-600 hover:text-neutral-400">
          <h3 className="tracking-wide leading-8">
            Instructions
          </h3>

          <p className="text-sm">
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
