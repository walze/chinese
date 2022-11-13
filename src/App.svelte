<script lang="ts">
  import {
    BehaviorSubject,
    debounceTime,
    lastValueFrom,
    mergeMap,
  } from 'rxjs';
  import { fromFetch } from 'rxjs/fetch';
  import List from './lib/List.svelte';
  import type { Data, ItemObject } from './vite-env';

  import { onMount } from 'svelte';

  import Fuse from 'fuse.js';

  const data = fromFetch('/cedict.json').pipe(
    mergeMap((r) => r.json() as Promise<Data>),
  );

  const fuse = new Fuse<ItemObject>([], {
    includeScore: true,
    keys: ['hanzi', 'pinyin', 'def'],
  });

  onMount(async () => {
    const d = (await lastValueFrom(data)).map(
      ([hanzi, pinyin, def]) => ({
        hanzi,
        pinyin,
        def,
      }),
    );

    fuse.setCollection(d);
  });

  let selected: ItemObject | null = null;
  const subject = new BehaviorSubject('');
  const input = subject.pipe(debounceTime(100));

  $: list = $input
    ? fuse
        .search($input, {
          limit: 10,
        })
        .map((r) => r.item)
    : [];
</script>

<main class="mx-auto max-w-[320px] p-4 pt-6 text-slate-50">
  {#if selected}
    <section
      class="mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700"
    >
      <div>
        <p class="text-8xl mb-2">
          {selected.hanzi}
        </p>
        漢字
        <span class="text-neutral-600 absolute ml-3 font-thin"
          >Hàn Zi</span
        >
      </div>

      <div>
        <span class="text-xl mb-4">
          {selected.pinyin}
        </span>
        <br />
        拼音
        <span class="text-neutral-600 absolute ml-3 font-thin"
          >Pīn Yin</span
        >
      </div>

      <div>
        <span class="text-xl mb-4">
          {selected.def}
        </span>
        <br />
        定義
        <span class="text-neutral-600 absolute ml-3 font-thin"
          >Definition</span
        >
      </div>
    </section>
  {/if}

  <label
    for="combobox"
    class="block text-2xl font-bold text-center mb-2"
  >
    Type your 拼音
    <span class="text-neutral-600 absolute ml-3 font-thin"
      >Pīn Yin</span
    >
  </label>
  <div class="relative mt-1">
    <input
      on:input={(e) => subject.next(e.currentTarget.value)}
      id="combobox"
      type="text"
      autofocus={true}
      class="w-full rounded-md border border-gray-300 bg-neutral-900 py-2 pl-3 pr-12 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"
      role="combobox"
      aria-controls="options"
      aria-expanded={!!list.length}
    />

    {#if list.length}
      <List
        items={list}
        onSelect={(item) => {
          selected = item;

          subject.next('');
        }}
      />
    {/if}
  </div>
</main>
