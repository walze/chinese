<script lang="ts">
  import type { ItemObject } from '../vite-env';
  import { numberToMark } from 'pinyin-utils';

  export let items: ItemObject[] = [];
  export let simplified: boolean = false;
  export let onSelect = (item: ItemObject) => {};
  const i = simplified ? 1 : 0;

  $: marks = items.map(({ hanzi, pinyin, def }) => [
    hanzi.split(' ')[i],
    numberToMark(pinyin),
    def,
  ]);
</script>

<ul
  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
  id="options"
  role="listbox"
>
  {#each marks as [hanzi, pinyin, def]}
    <li
      class="relative py-2 pl-3 pr-9 text-gray-900 hover:bg-slate-200 cursor-pointer"
      id="option-0"
      role="option"
      aria-selected="false"
      tabindex="-1"
      on:click={() => onSelect({ hanzi, pinyin, def })}
      on:keypress={(e) => {
        if (e.key === 'Enter') onSelect({ hanzi, pinyin, def });
      }}
    >
      <!-- Selected: "font-semibold" -->
      <span class="block truncate"
        >{hanzi} - {pinyin} - {def}</span
      >
    </li>
  {/each}
</ul>
