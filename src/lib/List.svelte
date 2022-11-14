<script lang="ts">
  import type { ItemObject } from '../vite-env';
  import { selected } from './store';

  export let items: ItemObject[] = [];
  export let simplified = true;

  $: marks = items.map(({ hanzi, pinyin, def }) => [
    hanzi,
    pinyin,
    def,
  ]);
</script>

{#if marks.length}
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
        on:click={() => {
          selected.set({ hanzi, pinyin, def });
          marks = [];
        }}
        on:keypress={(e) => {
          if (e.key === 'Enter')
            selected.set({ hanzi, pinyin, def });
        }}
      >
        <span class="block truncate"
          >{hanzi.split(' ')[simplified ? 1 : 0]} - {pinyin} - {def}</span
        >
      </li>
    {/each}
  </ul>
{/if}
