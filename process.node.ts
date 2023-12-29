import { createWriteStream, existsSync } from 'fs';

import fetch from 'node-fetch';

import zlib from 'zlib';

const PUBLIC_TXT = './public/cedict.txt';

export const main = async () => {
  if (existsSync(PUBLIC_TXT))
    return console.log('cedict already exists');

  console.log('downloading cedict');
  const res = await fetch(
    'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz',
  );

  console.log('writing cedict');
  const out = createWriteStream(PUBLIC_TXT, {
    encoding: 'utf-8',
  });

  console.log('piping cedict');
  res.body?.pipe(zlib.createGunzip()).pipe(out);

  res.body?.on('end', () => {
    console.log('Done downloading cedict');
    out.close();
  });

  out.on('error', console.error);
};

await main();
