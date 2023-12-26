import { createEffect, Component } from 'solid-js';
import Hanzi from 'hanzi-writer';
let container: HTMLDivElement;

const HanziComponent: Component<{ chars: string }> = (props) => {
  let chars = props.chars;

  createEffect(() => {
    const els = [...chars].map((char) => {
      const el = document.createElement('div');

      const w = Math.min(238 / chars.length, 75);
      let hz = new Hanzi(el, {
        strokeColor: '#fff',
        outlineColor: '#222',
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 250,
        delayBetweenLoops: 1500,
        width: w,
        padding: 0,
        height: w,
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

      hz.setCharacter(char);
      hz.loopCharacterAnimation();

      return el;
    });

    if (container) container.replaceChildren(...els);
  });

  return (
    <div ref={container}>
      {/* Render the Hanzi characters */}
    </div>
  );
};

export default HanziComponent;
