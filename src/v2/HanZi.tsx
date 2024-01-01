import Hanzi from 'hanzi-writer';
import { useEffect, useRef, useState } from 'react';

const makeHanzi = (
  el: HTMLDivElement,
  char: string,
  chars: string,
) => {
  const w = Math.min(238 / chars.length, 75);

  return Hanzi.create(el, char, {
    strokeColor: '#fff',
    outlineColor: '#222',
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 250,
    delayBetweenLoops: 1500,
    width: w,
    padding: 0,
    height: w,
    showOutline: true,
    charDataLoader: () =>
      fetch(
        `https://cdn.jsdelivr.net/npm/hanzi-writer-data/${char}.json`,
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch(() => {
          el.innerHTML = char;

          return {};
        }),
  });
};

const HanziComponent = (props: { chars: string }) => {
  const { chars } = props;

  const container = useRef<HTMLDivElement>(null);
  const [els, setEls] = useState<
    (readonly [string, HTMLDivElement])[]
  >([]);

  useEffect(() => {
    const els = [...chars].map((char) => {
      const div = document.createElement('div');
      div.className = 'hanzi';
      div.dataset.hanzi = char;

      return [char, div] as const;
    });

    setEls(() => els);
  }, [chars]);

  useEffect(() => {
    container.current?.replaceChildren(
      ...els.map(([, el]) => el),
    );

    for (const [char, el] of els) {
      const hz = makeHanzi(el, char, chars);
      hz.loopCharacterAnimation();
    }
  }, [els]);

  return (
    <div
      ref={container}
      className="w-full flex justify-center items-center -mt-2 mb-2 font-bold text-xl"
    >
      {/* Render the Hanzi characters */}
    </div>
  );
};

export default HanziComponent;
