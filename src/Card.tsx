import { numberToMark } from 'pinyin-utils';
import { ItemObject } from './vite-env';

export default function (selected: ItemObject) {
  return (
    <section className="mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700">
      <div>
        {/* {selected?.hanzi && <Hanzi chars={selected?.hanzi} />} */}
        <h2 className="text-4xl">{selected.hanzi}</h2>
        <span className="text-neutral-300">汉字</span>
        <span className="text-neutral-600 absolute ml-3 font-thin">
          Hàn Zi
        </span>
      </div>

      <div>
        <span className="text-xl mb-4">
          {numberToMark(selected?.pinyin as string)}
        </span>
        <br />
        <span className="text-neutral-300">拼音</span>
        <span className="text-neutral-600 absolute ml-3 font-thin">
          Pīn Yin
        </span>
      </div>

      <div>
        <span className="text-xl mb-4">
          {selected?.def.replaceAll('/', ' — ')}
        </span>
        <br />
        <span className="text-neutral-300">定义</span>
        <span className="text-neutral-600 absolute ml-3 font-thin">
          Definition
        </span>
      </div>
    </section>
  );
}
