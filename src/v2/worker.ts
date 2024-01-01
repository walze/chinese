import Fuse from 'fuse.js';
import {
  mergeMap,
  mergeAll,
  map,
  toArray,
  tap,
  filter,
  pipe,
  from,
  of,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { openDB, type DBSchema } from 'idb';
import {
  ItemObject,
  WorkerEvent,
  WorkerType,
} from '../vite-env';

const regex = /(.*)\s\[(.*)\]\s\/(.*)\//giu;

interface MyDB extends DBSchema {
  cedict: { key: 'txt'; value: string };
  data: { key: 'data'; value: ItemObject[] };
}

const db = await openDB<MyDB>('mandarin', 1, {
  upgrade(db) {
    db.createObjectStore('cedict');
    db.createObjectStore('data');
  },
});

const fuse = new Fuse<ItemObject>([], {
  keys: ['hanzi', 'pinyin', 'def'],
});

const fetchData = () =>
  fromFetch('/cedict.txt').pipe(
    mergeMap((r) => r.text()),
    tap((r) => db.put('cedict', r, 'txt').then(console.log)),
  );

const getData = pipe(
  mergeMap((chunk: string) => chunk.split(/\r\n/g)),
  map((s) =>
    Array.from(s.matchAll(regex)).flatMap(
      ([, word, pinyin, definition]) => [
        word,
        pinyin,
        definition,
      ],
    ),
  ),
  filter((a) => a.length > 0),
  toArray(),
  mergeAll(),
  map(([hanzi, pinyin, def]) => ({
    hanzi,
    pinyin,
    def,
  })),
  toArray<ItemObject>(),
);

from(db.get('cedict', 'txt').catch(() => null))
  .pipe(
    mergeMap((r) => (r ? of(r) : fetchData())),
    getData,
  )
  .subscribe((d) => {
    fuse.setCollection(d);
  });

const mkEvent = <T>(type: WorkerType, data: T) => ({
  type,
  data,
});

self.addEventListener('message', (e: WorkerEvent<string>) => {
  console.log(`Worker received ${e.data.type}`, e);

  switch (e.data.type) {
    case 'input':
      search(e.data.type);
      break;
    case 'query':
      search(e.data.type);
      break;
  }

  function search(type: WorkerType) {
    const data = fuse
      .search(e.data.data, {
        limit: 100,
      })
      .map((r) => r.item)
      .sort((a, b) => a.hanzi.localeCompare(b.hanzi));

    self.postMessage(mkEvent(type, data));
  }
});
