import {
  createEffect,
  Component,
  splitProps,
  onCleanup,
} from 'solid-js';
import Hanzi from 'hanzi-writer';
let container: HTMLDivElement;

const makeHanzi = (
  el: HTMLDivElement,
  char: string,
  chars: string,
) => {
  const w = Math.min(238 / chars.length, 75);

  return new Hanzi(el, {
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

const HanziComponent: Component<{ chars: string }> = (props) => {
  const [{ chars }] = splitProps(props, ['chars']);

  createEffect(async () => {
    const els = [...chars].map(async (char) => {
      const el = document.createElement('div');

      const hz = makeHanzi(el, char, chars);

      await hz.setCharacter(char);
      hz.loopCharacterAnimation();

      return el;
    });

    Promise.all(els).then(console.log);

    if (container)
      container.replaceChildren(...(await Promise.all(els)));
  });

  onCleanup(() => {
    console.log('cleanup');
  });

  return (
    <div
      ref={container}
      class="w-full flex justify-center items-center -mt-2 mb-2 font-bold text-xl"
    >
      {/* Render the Hanzi characters */}
    </div>
  );
};

export default HanziComponent;
