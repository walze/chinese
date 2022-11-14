import { createReadStream, createWriteStream, unlink } from 'fs';
import { filter, map, mergeMap, toArray } from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import gz from 'node-gzip';

const regex = /(.*)\s\[(.*)\]\s\/(.*)\//giu;

try {
  unlink('./public/cedict.json', console.log);
  unlink('./cedict.txt', console.log);
} catch (error) {
  console.error(error);
}

const gzip = createWriteStream('./cedict.txt');
const json = createWriteStream('./public/cedict.json');

fromFetch(
  'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz',
)
  .pipe(
    mergeMap((r) => r.arrayBuffer()),
    mergeMap((r) => gz.ungzip(r)),
    map((r) => r.toString()),
    map((s) => gzip.write(s)),
    map(() => gzip.close()),
    mergeMap(() => createReadStream('cedict.txt')),
    map((chunk) => chunk.toString() as string),
    mergeMap((chunk) => chunk.split(/\r\n/g)),
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
  )
  .subscribe({
    next: (xs) => {
      json.write(JSON.stringify(xs));
    },
    complete: () => {
      json.close();
    },
  });
