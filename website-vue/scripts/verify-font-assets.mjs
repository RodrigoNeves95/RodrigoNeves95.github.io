import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const assetNames = await readdir(resolve('dist/assets'));
const fontAssets = assetNames.filter((name) => /\.woff2?$/.test(name)).sort();
const expectedFamilies = [
  'ibm-plex-mono-latin-400-normal',
  'ibm-plex-mono-latin-600-normal',
  'inter-latin-400-italic',
  'inter-latin-400-normal',
  'inter-latin-500-normal',
  'inter-latin-600-normal',
];

assert.equal(fontAssets.length, expectedFamilies.length, `Unexpected font assets: ${fontAssets}`);
assert.equal(
  fontAssets.some((name) => name.endsWith('.woff')),
  false,
  'Legacy WOFF emitted',
);
for (const expected of expectedFamilies) {
  assert.equal(
    fontAssets.some((name) => name.startsWith(expected)),
    true,
    `Missing ${expected}`,
  );
}
assert.equal(
  fontAssets.some((name) => /calibre|sfmono/i.test(name)),
  false,
  'Superseded font emitted',
);

process.stdout.write(`Verified ${fontAssets.length} licensed WOFF2 font assets.\n`);
