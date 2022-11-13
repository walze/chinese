import { createReadStream, createWriteStream, unlink } from 'fs';
import {
  filter,
  from,
  map,
  mergeAll,
  mergeMap,
  take,
  toArray,
} from 'rxjs';

const file = createReadStream('cedict.txt', {
  encoding: 'utf8',
});
const regex = /(.*)\s\[(.*)\]\s\/(.*)\//giu;

unlink('cedict.json', console.log);

const json = createWriteStream('public/cedict.json', {
  encoding: 'utf8',
  autoClose: true,
  flags: 'a',
  emitClose: true,
});

json.write('[');

from(file)
  .pipe(
    map((chunk) => chunk.toString() as string),
    mergeMap((chunk) => chunk.split(/\r\n/g)),
    map((s) =>
      [...s.matchAll(regex)].flatMap(
        ([, word, pinyin, definition]) => [
          word,
          pinyin,
          definition,
        ],
      ),
    ),
    filter((a) => a.length > 0),
  )
  .subscribe({
    next: (xs) => {
      json.write(`${JSON.stringify(xs)},\r\n`);
    },
    complete: () => {
      json.write(']');
      json.close();
    },
  });
